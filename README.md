# RoboArtist Web App Front-end

This is the repository of the so called [RoboArtist](https://d1zpt1eoyirntk.cloudfront.net/) web application. The website allows users to transfer the style of one image onto another image. This is done using a Style-GAN (Generative Adversarial Network). A user may either select from a set of images provided by the website or upload their own. Images that are uploaded to the site are discarded immediately after being fed into the Style-GAN. 

The backend architecture is serverless and highly scalable. A Docker image containing the Python code and its dependencies is executed by AWS Lambda. CI/CD is performed using CodePipeline and CodeBuild. In addition, the site is accessible from Cloudfront and has zero operating costs, having been designed to use resources within free-tier limits.
