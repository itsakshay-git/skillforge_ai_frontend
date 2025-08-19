import {
    Home,
    FileText,
    Code,
    Mail,
    Brain,
    Settings as SettingsIcon,
    BarChart3,
    FileCheck,
    BookOpen,
    MessageSquare,
    Lightbulb,
} from "lucide-react";

import ResumeOptimizer from "@/components/resumeoptimizer/ResumeOptimizer";
import FileUpload from "@/components/summarizer/FileUpload";
import CodeExplainer from "@/components/codeexplainer/CodeExplainer";
import EmailAssistant from "@/components/email/EmailAssistant";
import CodeQuizForm from "@/components/codequizform/CodeQuizForm";
import Settings from "@/pages/settings/Settings";

const testimonials = [
    {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: `"This AI tool has revolutionized my workflow. I can now summarize documents in minutes!"`,
        author: "- Sarah K."
    },
    {
        img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: `"The email writer is a game-changer. My emails are now more professional and effective."`,
        author: "- David L."
    },
    {
        img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: `"The resume analyzer helped me land my dream job. The feedback was invaluable."`,
        author: "- Emily R."
    },
    {
        img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: `"This AI tool has revolutionized my workflow. I can now summarize documents in minutes!"`,
        author: "- Sarah K."
    }
];

const tools = [
    {
        icon: FileCheck,
        title: "Resume Optimizer",
        description: "Get instant feedback on your resume to improve your chances of landing your dream job.",
        path: "/resume-optimizer",
        requiresAuth: true
    },
    {
        icon: BookOpen,
        title: "Document Summarizer",
        description: "Summarize long documents quickly and efficiently, saving you time and effort.",
        path: "/summarizer",
        requiresAuth: true
    },
    {
        icon: Code,
        title: "Code Explainer",
        description: "Understand complex code with AI-powered explanations in multiple programming languages.",
        path: "/code-explainer",
        requiresAuth: true
    },
    {
        icon: MessageSquare,
        title: "Email Assistant",
        description: "Craft professional and effective emails with ease using our AI-powered email writer.",
        path: "/email-assistant",
        requiresAuth: true
    },
    {
        icon: Lightbulb,
        title: "Code Quiz Generator",
        description: "Generate coding quizzes and interview questions to test your programming knowledge.",
        path: "/code-quiz",
        requiresAuth: true
    }
];

const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", component: null },
    {
        icon: FileText,
        label: "Resume Optimizer",
        path: "/dashboard/resume",
        component: ResumeOptimizer,
    },
    {
        icon: Brain,
        label: "Document Summarizer",
        path: "/dashboard/summarizer",
        component: FileUpload,
    },
    {
        icon: Code,
        label: "Code Explainer",
        path: "/dashboard/code-explainer",
        component: CodeExplainer,
    },
    {
        icon: Mail,
        label: "Email Assistant",
        path: "/dashboard/email",
        component: EmailAssistant,
    },
    {
        icon: BarChart3,
        label: "Code Quiz Generator",
        path: "/dashboard/quiz",
        component: CodeQuizForm,
    },
    {
        icon: SettingsIcon,
        label: "Settings",
        path: "/dashboard/settings",
        component: Settings,
    },
];

const colorMap = {
    tone: 'bg-blue-50 text-blue-700',
    fileType: 'bg-green-50 text-green-700',
    contentLength: 'bg-purple-50 text-purple-700',
    summaryLength: 'bg-yellow-50 text-yellow-700',
    resultLength: 'bg-yellow-50 text-yellow-700',
    resumeLength: 'bg-pink-50 text-pink-700',
    jobTextLength: 'bg-orange-50 text-orange-700',
    language: 'bg-indigo-50 text-indigo-700',
    codeLength: 'bg-purple-50 text-purple-700',
    explanationLength: 'bg-yellow-50 text-yellow-700',
    mode: 'bg-teal-50 text-teal-700',
    recipient: 'bg-rose-50 text-rose-700',
    inputLength: 'bg-fuchsia-50 text-fuchsia-700',
    contextLength: 'bg-gray-50 text-gray-700',
    responseLength: 'bg-green-50 text-green-700',
    type: 'bg-cyan-50 text-cyan-700',
    topic: 'bg-amber-50 text-amber-700',
    quizLength: 'bg-violet-50 text-violet-700',
    questionCount: 'bg-red-50 text-red-700'
}

export { testimonials, tools, sidebarItems, colorMap };