"use client";

import { FadeInView } from "@/components/animations/fade-in-view";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Story } from "@/types/app-types";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const stories: Story[] = [
  {
    id: 1,
    content: "story1",
  },
  {
    id: 2,
    content: "story2",
  },
];

export function StoriesView() {
  const t = useTranslations("StoriesPage");
  const [story, setStory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(t("successMessage"));
    setStory("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen gradient-hero py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInView>
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
              {t("title")}
            </h1>
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="max-w-3xl mx-auto mb-16 lg:mb-24">
            <div className="glass-card p-8 lg:p-12">
              <p className="text-muted-foreground leading-relaxed mb-8 text-base lg:text-lg">
                {t("intro")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder={t("placeholder")}
                  className="min-h-[150px] rounded-2xl border-border/50 bg-background/50 focus:border-primary resize-none text-base"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground max-w-md">
                    {t("disclaimer")}
                  </p>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting || !story.trim()}
                    className="shrink-0 cursor-pointer"
                  >
                    {isSubmitting ? t("submitting") : t("submitButton")}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </FadeInView>

        <div className="max-w-5xl mx-auto">
          <FadeInView delay={0.3}>
            <h2 className="text-2xl lg:text-3xl font-serif text-center text-foreground mb-8 lg:mb-12">
              {t("otherStories")}
            </h2>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {stories.map((item, index) => (
              <FadeInView key={item.id} delay={0.4 + index * 0.1}>
                <div className="glass-card-hover p-6 lg:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center">
                      <span className="text-primary text-sm font-medium">
                        A
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {t("anonymous")}
                    </span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed italic">
                    `{t(item.content)}`
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
