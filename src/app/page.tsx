import IncidentList from "@/components/incidents/IncidentsSection";
import Navbar from "@/components/Navbar";
import { getCameras, getIncidents } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["incidents"],
    queryFn: getIncidents,
  });

  // camera
  await queryClient.prefetchQuery({
    queryKey: ["cameras"],
    queryFn: getCameras,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IncidentList />
      </HydrationBoundary>
    </div>
  );
}
