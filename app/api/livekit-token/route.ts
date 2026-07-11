import { NextRequest } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { createClient } from "@supabase/supabase-js";

// Generates a short-lived LiveKit access token for a signed-in user to
// join a specific room. Requires LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and
// NEXT_PUBLIC_LIVEKIT_URL to be set as environment variables (the first
// two server-only, the URL is safe to expose to the client since it's
// just a WebSocket endpoint, not a credential).

export async function POST(req: NextRequest) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return Response.json(
      { error: "Live-Anrufe sind noch nicht konfiguriert. Der Betreiber muss LIVEKIT_API_KEY und LIVEKIT_API_SECRET einrichten." },
      { status: 503 }
    );
  }

  let body: { roomName?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const roomName = body.roomName?.trim();
  if (!roomName) {
    return Response.json({ error: "Kein Raum angegeben." }, { status: 400 });
  }

  // Verify the requester has a real, valid Supabase session before
  // minting a token — never trust a client-supplied user identity.
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");
  if (!accessToken) {
    return Response.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

  if (userError || !userData.user) {
    return Response.json({ error: "Sitzung ungültig. Bitte melde dich erneut an." }, { status: 401 });
  }

  const identity = userData.user.id;
  const displayName =
    (userData.user.user_metadata?.full_name as string | undefined) ??
    userData.user.email?.split("@")[0] ??
    "Teilnehmer";

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
    name: displayName,
    ttl: "2h",
  });
  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const jwt = await token.toJwt();
  return Response.json({ token: jwt, url: process.env.NEXT_PUBLIC_LIVEKIT_URL });
}
