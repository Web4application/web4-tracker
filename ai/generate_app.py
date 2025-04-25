import os
import pandas as pd
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Load CSV data
csv_file_path = "../data/predev_work.csv"
loader = CSVLoader(file_path=csv_file_path)
documents = loader.load()

# Initialize OpenAI's GPT-4 model
llm = ChatOpenAI(openai_api_key=openai_api_key, model_name="gpt-4")

# Define a prompt template
prompt_template = PromptTemplate(
    input_variables=["csv_data"],
    template="""
You are an AI developer assistant.

Given the following CSV data:

{csv_data}

Generate a React component that displays this data in a user-friendly interface.
The component should include features like sorting and filtering.

Provide only the code for the component.
"""
)

# Create a chain
chain = LLMChain(llm=llm, prompt=prompt_template)

# Convert documents to a string representation
csv_data_str = "\n".join([str(doc.page_content) for doc in documents])

# Generate React component code
response = chain.run(csv_data=csv_data_str)

# Save the generated code to a file
output_dir = "../generated"
os.makedirs(output_dir, exist_ok=True)
output_file = os.path.join(output_dir, "GeneratedComponent.jsx")

with open(output_file, "w") as f:
    f.write(response)

print(f"Generated React component saved to {output_file}")
