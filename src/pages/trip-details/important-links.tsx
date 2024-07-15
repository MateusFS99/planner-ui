import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateImportantLinkModal } from "./create-important-link-modal";

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const { trip_id } = useParams();
  const [importantLinks, setImportantLinks] = useState<Link[]>([]);
  const [isCreateImportantLinkOpen, setIsCreateImportantLinkOpen] =
    useState(false);

  function openCreateImportantLinkModal() {
    setIsCreateImportantLinkOpen(true);
  }

  function closeCreateImportantLinkModal() {
    setIsCreateImportantLinkOpen(false);
  }

  useEffect(() => {
    api
      .get(`trips/${trip_id}/links`)
      .then((response) => setImportantLinks(response.data.links));
  }, [trip_id]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>

      {importantLinks.map((link) => {
        return (
          <div key={link.id} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          </div>
        );
      })}

      <Button
        onClick={openCreateImportantLinkModal}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateImportantLinkOpen && (
        <CreateImportantLinkModal
          closeCreateImportantLinkModal={closeCreateImportantLinkModal}
        />
      )}
    </div>
  );
}
