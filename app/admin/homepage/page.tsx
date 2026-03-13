import { getHomepageHeroContent } from "@/lib/homepage";
import HomepageEditor from "@/components/admin/homepage-editor";

export default async function AdminHomepagePage() {
  const initialContent = await getHomepageHeroContent();
  return <HomepageEditor initialContent={initialContent} />;
}
