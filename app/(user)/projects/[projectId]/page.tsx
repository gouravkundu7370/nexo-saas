import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
import React from "react";
import Table from "@/components/Table";


export default async function page({ params }: { params: Promise<{ projectId: string }> }) {
   const resolvedParams = await params;
  const { projectId: rawProjectId } = resolvedParams;
  const projectId = parseInt(rawProjectId);

  if (isNaN(projectId)) {
    return <div>Invalid Project ID</div>;
  }

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, projectId),
    with: {
      feedbacks: true,
    },
  });

  if (!projects.length) {
    return <div>Project not found</div>;
  }

  const project = projects[0];

  return (
    <div>
      <div>
        <Link
          href="/dashboard"
          className="flex items-center text-blue-400 underline font-semibold mb-5 w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-1 underline" />
          <span className="text-lg">Back to Projects</span>
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div className="proj-info">
          <h1 className="text-4xl gradient-title font-extrabold mb-3 underline">
            {project.name}
          </h1>
          <h2 className="text-xl mb-2">{project.description}</h2>
        </div>
        <div className="flex flex-col">
          {project.url ? (
            <Link
              href={project.url}
              className="underline font-bold text-blue-700 flex items-center"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-lg">Visit site</span>
            </Link>
          ) : null}
          <Link
            href={`/projects/${projectId}/instructions`}
            className="underline text-blue-700 flex items-center mt-2"
          >
            <Code className="h-5 w-5 mr-1" />
            <span className="text-lg">Embed Code</span>
          </Link>
        </div>
      </div>
      <div>
        <Table data={project.feedbacks} />
      </div>
    </div>
  );
}
