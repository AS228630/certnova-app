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
};

export default az900_en;
