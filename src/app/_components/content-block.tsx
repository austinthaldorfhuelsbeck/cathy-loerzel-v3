import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type PropsWithChildren } from "react";

const ContentBlock = (
  props: PropsWithChildren<{ title?: string; subtitle?: string }>,
) => {
  return (
    <Card className="m-5 max-w-3xl p-5 text-muted-foreground md:mx-auto lg:max-w-4xl lg:p-0">
      {props.title && (
        <CardHeader>
          <CardTitle className="text-4xl text-primary">{props.title}</CardTitle>
          <CardTitle className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
            {props.subtitle}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex grid-cols-2 flex-col items-center gap-5 sm:grid md:grid-cols-3">
        {props.children}
      </CardContent>
    </Card>
  );
};

export default ContentBlock;
