import { FileTree } from "@/components/FileTree";
import { FileViewer } from "@/components/FileViewer";
import { ThemeToggle } from "@/components/ThemeToggle";

async function getTreeData() {
  const res = await fetch("https://ubique.img.ly/frontend-tha/data.json", {
    next: { revalidate: 28800 },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function Page() {
  const data = await getTreeData();

  return (
    <main className="min-h-screen flex">
      <FileTree data={data} />
      <FileViewer />
      <div className="fixed top-1 right-1">
        <ThemeToggle />
      </div>
    </main>
  );
}
