import { Card, CardBody } from "@nextui-org/react";

import PathForm from "./components/path_form";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col gap-4 w-full items-center text-center justify-center">
          <h1 className={title()}>CopyTo</h1>
          <Card className="w-[50%]">
            <CardBody>
              <PathForm />
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
