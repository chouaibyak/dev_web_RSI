'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProjetsPage(){
    const { user } = useAuth();
    const router = useRouter();

    if (!user) return <p>Veuillez vous connecter</p>;

    const projets = [
        { title: "Manipulation de matrices avec Javascript", path: "/projets/matrices" },
        { title: "Manipulation de formulaires (PHP)", path: "/projets/formulaires" },
        { title: "Images en base de données", path: "/projets/images" },
        { title: "Quiz", path: "/projets/quiz" },
        { title: "Statistiques avec ChartJS", path: "/projets/stats" },
        { title: "Géolocalisation", path: "/projets/geo" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Mes Projets</h1>

            <ol className="list-decimal pl-6 space-y-2">
                {projets.map((p, index) => (
                    <li key={index}>
                        <button
                            onClick={() => router.push(p.path)}
                            className="text-blue-600 hover:underline"
                        >
                            {p.title}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}