Sentiment Analysis Dashboard
A full-stack web application that performs sentiment analysis on CSV data, featuring an interactive dashboard with real-time visualizations.
Features

📊 Real-time sentiment analysis of CSV data
📈 Interactive data visualizations using Recharts
😊 Emoji-based sentiment indicators
🎨 Modern UI with Tailwind CSS
📱 Responsive design for all devices
⚡ Fast processing with FastAPI backend

Live Demo
Backend: https://ai-powered-sentiment-analysis-gemm.onrender.com
Frontend: https://ai-sentiment-analysis-2.onrender.com/
Tech Stack
Backend

FastAPI
Python
TextBlob
Pandas
Uvicorn

Frontend

React
Recharts
Tailwind CSS

Getting Started
Prerequisites

Python 3.8 or higher
Node.js 14 or higher
npm or yarn

Backend Setup

Clone the repository

bashCopygit clone [your-repo-url]
cd [your-repo-name]/backend

Install dependencies

bashCopypip install -r requirements.txt

Run the server

bashCopyuvicorn main:app --reload
The backend will be running at http://localhost:8000
Frontend Setup

Navigate to frontend directory

bashCopycd frontend

Install dependencies

bashCopynpm install

Start development server

bashCopynpm start
The frontend will be running at http://localhost:3000
API Documentation
Analyze Sentiment
httpCopyPOST /analyze
Request

Content-Type: multipart/form-data
Body: CSV file with columns id and text

Response
jsonCopy{
    "overall_sentiment": 0.35,
    "sentiment_distribution": {
        "positive": 60,
        "neutral": 30,
        "negative": 10
    },
    "detailed_results": [
        {
            "id": "1",
            "text": "Sample text",
            "sentiment": 0.8,
            "category": "positive"
        }
    ]
}
CSV File Format
Your CSV file should have the following columns:
csvCopyid,text
1,"Great product, highly recommended!"
2,"Could be better, but not bad"
3,"Terrible experience, would not buy again"
Deployment
Backend (Render)

Create a new Web Service on Render
Connect your GitHub repository
Configure build settings:

Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT



Frontend (Your preferred platform)

Build the frontend:

bashCopynpm run build

Deploy the build directory to your hosting platform

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

TextBlob for sentiment analysis
Recharts for beautiful charts
Tailwind CSS for styling
FastAPI for the backend framework

Screenshots
[Add your application screenshots here]
Contact
Your Name - [your-email@example.com]
Project Link: https://github.com/yourusername/your-repo-name
