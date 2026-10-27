import { createFileRoute } from "@tanstack/react-router";
import { NakconelApp } from "@/components/nakconel-app";

export const Route = createFileRoute("/")({ component: NakconelApp });
