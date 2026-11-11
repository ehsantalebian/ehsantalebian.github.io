export const personalLeft = [
  { title: "first name", value: "Ehsan" },
  { title: "last name", value: "Talebian" },
  { title: "linkedin", value: "ehsantalebian", href: "https://www.linkedin.com/in/ehsantalebian" },
  { title: "Nationality", value: "Iranian" },
  { title: "Freelance", value: "Available" },
];

export const personalRight = [
  { title: "Address", value: "Tehran, Iran" },
  { title: "phone", value: "+98 935 152 7811" },
  { title: "Email", value: "ehsan.talebian@outlook.com" },
  { title: "birthdate", value: "May 31, 1997" },
  { title: "languages", value: "English, Persian" },
];

export const stats = [
  { value: "5", line1: "years in", line2: "IT industry", margin: "with-margin" },
  { value: "40+", line1: "managed", line2: "applications", margin: "with-margin" },
  { value: "3", line1: "years of", line2: "DevOps experience", margin: "with-margin-mobile" },
  { value: "2", line1: "Technical", line2: "Certifications", margin: "" },
];

export const skills = [
  "DevOps", "Docker", "CI/CD Pipelines", "GitLab CI/CD", "Jenkins", "Linux System Administration",
  "Git", "Bash Scripting", "Automation", "Ansible", "Sentry", "Nginx", "MySQL", "PostgreSQL",
  "Virtualization (VMware)", "Jira Administrator", "Windows Server",
];

export type ResumeItem = { time: string; title: string; place: string; text: string };

export const experience: ResumeItem[] = [
  {
    time: "2024 - Present",
    title: "DevOps Engineer",
    place: "Ariana Labs",
    text: "Automated infrastructure deployments for 40+ production and UAT environments using Ansible. Managed containerized applications and optimized Linux system performance.",
  },
  {
    time: "2025",
    title: "International IT Consultant",
    place: "East Asia Foreign IT Firm",
    text: "Provided on-site IT consulting for an international firm in East Asia. Spent 2 months living and working on-site in Myanmar to deploy systems and manage localized architectures.",
  },
  {
    time: "Previous Roles",
    title: "Jira Administrator & IT Specialist",
    place: "Ariana Labs / Various",
    text: "Designed and administered internal Jira workflows, agile boards, and permissions to streamline development lifecycles across engineering units.",
  },
];

export const education: ResumeItem[] = [
  {
    time: "Graduated",
    title: "Bachelor of Information Technology",
    place: "North Tehran Azad University",
    text: "Studied core software systems foundations, network administration paradigms, operating systems, and database configurations.",
  },
  {
    time: "Certifications",
    title: "Network+ & CCNA",
    place: "Cisco / CompTIA Frameworks",
    text: "Validated technical competencies in core networking, routing, switching protocols, interface architectures, and system diagnostics.",
  },
  {
    time: "2 Years Experience",
    title: "English Instructor & TTC Certified",
    place: "Language Institute",
    text: "Taught professional English utilizing formal certified methods, refining communication skills used for drafting documentation and leading global teams.",
  },
];

export const contactLinks = [
  { icon: "fa-phone", label: "Call or WhatsApp", text: "+98 935 152 7811", href: "tel:+989351527811" },
  { icon: "fa-envelope-open", label: "Mail Me", text: "ehsan.talebian@outlook.com", href: "mailto:ehsan.talebian@outlook.com" },
  { icon: "fa-linkedin-square", label: "LinkedIn Profile", text: "linkedin.com/in/ehsantalebian", href: "https://www.linkedin.com/in/ehsantalebian", external: true },
  { icon: "fa-github", label: "Code Hub", text: "github.com/ehsantalebian", href: "https://github.com/ehsantalebian", external: true },
  { icon: "fa-gitlab", label: "GitLab", text: "gitlab.com/ehsant2627", href: "https://gitlab.com/ehsant2627", external: true },
];
