import { getSchedulingById } from "@/api/client";
import SchedulingForm from "@/components/SchedulingForm";

export default async function Cadastro({
  params
}) {
  const info = await params;
  const scheduling = await getSchedulingById(info.id); 
  console.log(scheduling)

  return (
   <SchedulingForm data={{totalPeriod: scheduling.periodos, edit: scheduling}}/>
  );
}
