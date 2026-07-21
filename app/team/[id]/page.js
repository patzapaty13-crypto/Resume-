"use client";

import { use } from "react";
import IndividualResumeView from "../../components/IndividualResumeView";

export default function TeamMemberPage({ params }) {
  const resolvedParams = use(params);
  return <IndividualResumeView memberId={resolvedParams.id} />;
}
