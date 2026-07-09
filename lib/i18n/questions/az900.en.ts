import type { QuestionTranslations } from "./types";

// English translations of AZ900_QUESTIONS. Translated in batches, verified
// against the German original for accuracy (not machine-translated
// carelessly — same standard as the original extraction). PROGRESS: 7 of
// 564 questions translated so far (real-az900-1 through real-az900-7).
// Extend this incrementally; anything not listed here falls back to German.

const az900_en: QuestionTranslations = {
  "real-az900-1": {
    prompt: "You are planning to map a network drive on several Windows 10 computers to Azure Storage. You need to create a storage solution in Azure for the planned mapped drive. What should you create?",
    options: {
      A: "An Azure SQL database",
      B: "A data disk for virtual machines",
      C: "A file service in a storage account",
      D: "A blob service in a storage account",
    },
    explanation: "Azure Files offers fully managed file shares in the cloud that can be accessed via the industry-standard Server Message Block (SMB) protocol or the Network File System (NFS) protocol. Azure file shares can be mounted concurrently by cloud or on-premises deployments. Azure Files SMB file shares can be accessed from Windows, Linux, and macOS clients. Azure Files NFS file shares can be accessed from Linux or macOS clients. In addition, Azure Files SMB file shares can be cached on Windows servers with Azure File Sync for fast access near where the data is used.",
  },
  "real-az900-2": {
    prompt: "Your company plans to deploy an AI (artificial intelligence) solution on Azure. What should the company use to build, test, and deploy predictive analytics solutions?",
    options: {
      A: "Azure Logic Apps",
      B: "Azure Machine Learning Studio",
      C: "Azure Batch",
      D: "Azure Cosmos DB",
    },
    explanation: "Machine learning is a data science technique that allows computers to use existing data to predict future behaviors, outcomes, and trends. Using machine learning, computers learn without being explicitly programmed. Forecasts or predictions from machine learning can make apps and devices smarter. For example, when you shop online, machine learning helps recommend other products you might be interested in based on what you've purchased. Or when your credit card is swiped, machine learning compares the transaction to a database of transactions and helps detect fraud. And when your robotic vacuum cleans a room, machine learning helps it decide whether the job is done. Azure Machine Learning Studio is a web portal in Azure Machine Learning that offers low-code and no-code options for model training, deployment, and asset management. The studio is integrated into the Azure Machine Learning SDK for a seamless experience.",
  },
  "real-az900-3": {
    prompt: "Note: This question requires you to evaluate the underlined text to determine if it is correct. Azure Policies provide a common platform for deploying objects in a cloud infrastructure and for implementing consistency across the Azure environment. (Instructions: Review the underlined text. If it makes the statement correct, select 'No change needed'. If the statement is incorrect, select the answer option that makes the statement correct.)",
    underlinedText: "Azure Policies",
    options: {
      A: "No change needed",
      B: "Resource groups provide",
      C: "Azure Resource Manager provides",
      D: "Management groups provide",
    },
    explanation: "Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that lets you create, update, and delete resources in your Azure account. You use management features like access control, locks, and tags to secure and organize your resources after deployment.",
  },
  "real-az900-4": {
    prompt: "Your company has several business units. Each business unit needs 20 different Azure resources for daily operations. All business units need the same type of Azure resources. You need a solution to automate the creation of the Azure resources. What should you include in your recommendations?",
    options: {
      A: "Azure Resource Manager templates",
      B: "VM scale sets",
      C: "The Azure API Management service",
      D: "Management groups",
    },
    explanation: "Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that lets you create, update, and delete resources in your Azure account. You use management features like access control, locks, and tags to secure and organize your resources after deployment. An Azure Resource Manager (ARM) template is a JSON (JavaScript Object Notation) file that defines one or more resources to be deployed to a resource group, subscription, management group, or tenant. The template lets you deploy the resources consistently and repeatedly.",
  },
  "real-az900-5": {
    prompt: "Which Azure service should you use to correlate events from multiple resources in a central repository?",
    options: {
      A: "Azure Event Hubs",
      B: "Azure Analysis Services",
      C: "Azure Monitor",
      D: "Azure Log Analytics",
    },
    explanation: "Log Analytics is the primary tool in the Azure portal for writing log queries and interactively analyzing their results. Even when a log query is used elsewhere in Azure Monitor, you typically write and test the query in Log Analytics first. You can launch Log Analytics from several places in the Azure portal.",
  },
  "real-az900-6": {
    prompt: "Some question sets may include multiple correct solutions, while others may include none. Determine whether the solution meets the stated goals. Your Azure environment contains several Azure virtual machines. You need to ensure that a virtual machine named VM1 is reachable over HTTP from the internet. Solution: You modify a DDoS protection plan. Does this meet the goal?",
    options: {
      A: "Yes",
      B: "NO",
    },
    explanation: "We need to ensure that incoming HTTP traffic from the internet can pass through all firewalls and network security groups (NSGs) that apply to VM1.",
  },
  "real-az900-7": {
    prompt: "Some question sets may have more than one correct solution, while others may have none. Determine whether the solution meets the stated goals. Your Azure environment contains several Azure virtual machines. You need to ensure that a virtual machine named VM1 is reachable over HTTP from the internet. Solution: You modify an Azure Firewall. Does this meet the goal?",
    options: {
      A: "Yes",
      B: "NO",
    },
    explanation: "We need to ensure that incoming HTTP traffic from the internet can pass through all firewalls and network security groups (NSGs) that apply to VM1. Modifying Azure Firewall can achieve this, since it's one of the components that sits in the traffic path and can be configured to allow the required HTTP traffic.",
  },
  "real-az900-8": {
    prompt: "Some question sets may include more than one correct solution, while others may include none. Determine whether the solution meets the stated goals. Your Azure environment contains several Azure virtual machines. You need to ensure that a virtual machine named VM1 is reachable over HTTP from the internet. Solution: You modify an Azure Traffic Manager profile. Does this meet the goal?",
    options: { A: "Yes", B: "NO" },
    explanation: "We need to ensure that incoming HTTP traffic from the internet can pass through all firewalls and network security groups (NSGs) that apply to VM1.",
  },
  "real-az900-9": {
    prompt: "Which two characteristics does the public cloud have? (Each correct answer presents a complete solution. NOTE: Each correct selection is worth one point.)",
    options: {
      A: "Dedicated hardware",
      B: "Unsecured connections",
      C: "Limited storage space",
      D: "Consumption-based pricing",
      E: "Self-service management",
    },
    explanation: "Characteristics and benefits of cloud computing include the following: • On-demand self-service • Broad network access • Multi-tenancy and resource pooling • Rapid elasticity and scalability • Measured service",
  },
  "real-az900-10": {
    prompt: "Some question sets may include more than one correct solution, while others may have none. Determine whether the solution meets the stated goals. An Azure administrator plans to run a PowerShell script that creates Azure resources. You need to recommend which computer configuration to use to run the script. Solution: Run the script from a computer running Linux with the Azure CLI tools installed. Does this meet the goal?",
    options: { A: "Yes", B: "NO" },
    explanation: "The Azure command-line interface (Azure CLI) includes a set of commands for creating and managing Azure resources. Azure CLI is an alternative to Azure PowerShell. Azure PowerShell is designed for managing Azure resources from the command line. Use Azure PowerShell when you want to build automated tools that use the Azure Resource Manager model. Try Azure PowerShell in your browser with Azure Cloud Shell, or install it on your local computer.",
  },
  "real-az900-11": {
    prompt: "Some question sets may include more than one correct solution, while others may have none. Determine whether the solution meets the stated goals. An Azure administrator plans to run a PowerShell script that creates Azure resources. You need to recommend which computer configuration to use to run the script. Solution: Run the script from a computer running Chrome OS using Azure Cloud Shell. Does this meet the goal?",
    options: { A: "Yes", B: "NO" },
    explanation: "Azure PowerShell is designed for managing Azure resources from the command line. Use Azure PowerShell when you want to build automated tools that use the Azure Resource Manager model. Try it in your browser with Azure Cloud Shell, or install it on your local computer.",
  },
  "real-az900-12": {
    prompt: "Some question sets may include more than one correct solution, while others may have none. Determine whether the solution meets the stated goals. An Azure administrator plans to run a PowerShell script that creates Azure resources. You need to recommend which computer configuration to use to run the script. Solution: Run the script from a computer running macOS with PowerShell Core 6.0 installed. Does this meet the goal?",
    options: { A: "Yes", B: "NO" },
    explanation: "Azure PowerShell is designed for managing Azure resources from the command line. Use Azure PowerShell when you want to build automated tools that use the Azure Resource Manager model. Try it in your browser with Azure Cloud Shell, or install it on your local computer. The Azure PowerShell module can be installed on Windows, macOS, and Linux platforms.",
  },
  "real-az900-13": {
    prompt: "Note: This question requires you to evaluate the underlined text to determine if it is correct. Your Azure trial account expired last week. You can no longer create additional Azure Active Directory (Azure AD) user accounts. (Instructions: Review the underlined text. If it makes the statement correct, select 'No change needed'. If the statement is incorrect, select the answer option that makes the statement correct.)",
    underlinedText: "can no longer create additional Azure Active Directory (Azure AD) user accounts",
    options: {
      A: "No change needed",
      B: "start an existing Azure VM",
      C: "access your data stored in Azure",
      D: "access the Azure portal",
    },
    explanation: "If your Azure trial account has expired, you can still create Azure AD user accounts. The statement is therefore incorrect and must be changed. You cannot start an existing Azure virtual machine if the subscription containing the VM has expired. If the VM is running when the subscription expires, it is shut down.",
  },
  "real-az900-14": {
    prompt: "Note: This question requires you to evaluate the underlined text to determine if it is correct. You have several virtual machines in an Azure subscription. You create a new subscription. The virtual machines cannot be moved to the new subscription. (Instructions: Review the underlined text. If it makes the statement correct, select 'No change needed'. If the statement is incorrect, select the answer option that makes the statement correct.)",
    underlinedText: "The virtual machines cannot be moved to the new subscription",
    options: {
      A: "No change needed.",
      B: "The virtual machines can be moved to the new subscription.",
      C: "The virtual machines can only be moved to the new subscription if they are all in the same resource group.",
      D: "The virtual machines can only be moved to the new subscription if they are running Windows Server 2016.",
    },
    explanation: "VMs can be moved between subscriptions, regardless of which operating system they run or which resource group they're in.",
  },
  "real-az900-15": {
    prompt: "Which two customer types are eligible to use Azure Government to develop a cloud solution? (Each correct answer presents a complete solution. Note: Each correct selection is worth one point.)",
    options: {
      A: "A Canadian government contractor",
      B: "A European government contractor",
      C: "A United States government agency",
      D: "A US government contractor",
      E: "A European government agency",
    },
    explanation: "Azure Government is a cloud environment specifically designed to meet the compliance and security requirements of the US government. This mission-critical cloud delivers breakthrough innovation to US government customers and their partners. Azure Government applies to agencies at all levels — from state and local government to federal agencies, including Department of Defense agencies. While there are many cloud providers in the public sector, not many can offer the unique capabilities needed by state, local, and federal agencies. Azure Government provides hybrid flexibility, comprehensive security, and broad compliance coverage for all regulatory standards. The main difference between Microsoft Azure and Microsoft Azure Government is that Azure Government is a sovereign cloud. It's a physically separate instance of Azure dedicated exclusively to US government workloads. It was built exclusively for government agencies and their solution providers. Azure Government is designed for highly sensitive data and allows government customers to securely move mission-critical workloads to the cloud.",
  },
};

export default az900_en;
