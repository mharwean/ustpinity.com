# USTP Campus Connect

An interactive digital campus hub for the University of Science and Technology of Southern Philippines. This application provides a student-verified networking environment, departmental college portals, an innovation showcase, a student marketplace, alumni mentorship matching, and campus event trackers.

## 🌟 Key Features

- **Departmental College Portals**: Personalized layouts, announcements, and resources curated for individual university colleges.
- **Student-Verified Networking Feed**: Discussion space for campus news, questions, and collaborations.
- **Innovation & Research Board**: Collaboration matching for student projects, research publications, and startups.
- **Campus Marketplace**: Peer-to peer marketplace with category filtering (books, electronics, materials) for secure on-campus exchanges.
- **Alumni Mentorship**: Direct connection to USTP graduates for career advice, mentorship, and opportunities.
- **Campus Events Calendar**: Live tracking of upcoming departmental Seminars, hackathons, sports activities, and student organization meetings.

---

## 🚀 Local Development

To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed, and follow these steps:

1. **Extract or Clone the project**:
   Ensure you have the files in your project directory.

2. **Installdependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or the port displayed in your terminal.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The built assets will be generated in the `dist/` directory.

---

## 📦 How to Deploy on GitHub Pages (Automated)

This project is pre-configured for automated deployment to **GitHub Pages** using a relative base-path configuration and a GitHub Actions workflow.

### Step 1: Initialize Git and Create a Repository on GitHub
If you haven't already, turn this directory into a Git repository and push it to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - USTP Campus Connect"

# Rename default branch to main
git branch -M main

# Add your repository remote URL (replace <username> and <repo-name> with yours)
git remote add origin https://github.com/<username>/<repo-name>.git

# Push the code to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages Permissions
To allow the automated GitHub Action to publish your built site, you need to grant build permissions:

1. On your GitHub repository page, go to **Settings** (top tab).
2. Click on **Actions** -> **General** in the left sidebar.
3. Scroll down to **Workflow permissions**.
4. Select **Read and write permissions** (this allows the action to commit build artifacts to the `gh-pages` branch).
5. Click **Save**.

### Step 3: Trigger the Build and Deployment
The pre-configured workflow will run automatically:
1. Every time you `git push` to the `main` or `master` branch, the build workflow runs.
2. Under your repository's **Actions** tab, you will see the **Deploy to GitHub Pages** workflow run.
3. Once completed, a new `gh-pages` branch is automatically created containing the static build.
4. Go to **Settings** -> **Pages** in your repository.
5. Under **Build and deployment**, ensure the **Source** is set to "Deploy from a branch" and the branch is set to `gh-pages` / `/ (root)`.
6. Your application will be live at:
   `https://<username>.github.io/<repo-name>/`

---

## 🛠️ GitHub-Ready Configuration Details

- **Relative Asset Resolution**: In `vite.config.ts`, `base: './'` is configured so that built assets load correctly whether the repository is hosted at a root domain or a repository subfolder path on GitHub.
- **CI/CD Automation**: `.github/workflows/deploy.yml` takes care of installing dependencies, compiling the TypeScript files, running the Vite build, and rolling out the site automatically.
