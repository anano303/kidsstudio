"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import logo from "../../../assets/Images/galakids-logo.svg";
import "./about.css";
import creator1 from "./heart (1).png";
import creator2 from "./heart (2).png";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/LanguageContext";
import { Role } from "@/types/role";
import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Check, X, Plus, Trash2, Camera } from "lucide-react";

interface AboutSection {
  text: string;
  textEn: string;
  type: "normal" | "highlight" | "quote" | "final";
}

interface AboutPageData {
  title: string;
  titleEn: string;
  brandIntroTitle: string;
  brandIntroTitleEn: string;
  brandIntroText: string;
  brandIntroTextEn: string;
  sections: AboutSection[];
  ctaText: string;
  ctaTextEn: string;
  ctaHighlight: string;
  ctaHighlightEn: string;
  creatorsTitle: string;
  creatorsTitleEn: string;
  creatorImage1: string;
  creatorImage2: string;
}

function EditableText({
  value,
  onSave,
  multiline = false,
  className,
}: {
  value: string;
  onSave: (val: string) => void;
  multiline?: boolean;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleSave = () => {
    if (draft.trim() && draft !== value) {
      onSave(draft.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter" && !multiline) handleSave();
  };

  if (editing) {
    return (
      <span className="about-edit-wrap">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="about-edit-textarea"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="about-edit-input"
          />
        )}
        <span className="about-edit-actions">
          <button
            onClick={handleSave}
            className="about-edit-btn about-save"
            title="შენახვა"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="about-edit-btn about-cancel"
            title="გაუქმება"
          >
            <X size={16} />
          </button>
        </span>
      </span>
    );
  }

  return (
    <span className={className}>
      <button
        onClick={() => setEditing(true)}
        className="about-pencil-btn"
        title="რედაქტირება"
      >
        <Pencil size={13} />
      </button>
    </span>
  );
}

export default function AboutPage() {
  const [isPressed, setIsPressed] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted && user?.role === Role.Admin;

  const { data: aboutData } = useQuery<AboutPageData>({
    queryKey: ["about-page"],
    queryFn: async () => {
      const res = await apiClient.get("/settings/about");
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<AboutPageData>) => {
      const res = await apiClient.put("/settings/about", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["about-page"], data);
    },
  });

  const handleFieldUpdate = (field: keyof AboutPageData, value: string) => {
    updateMutation.mutate({ [field]: value });
  };

  const handleSectionTextUpdate = (index: number, value: string) => {
    if (!aboutData) return;
    const updated = [...aboutData.sections];
    const field = language === "en" ? "textEn" : "text";
    updated[index] = { ...updated[index], [field]: value };
    updateMutation.mutate({ sections: updated });
  };

  const handleSectionTypeToggle = (index: number) => {
    if (!aboutData) return;
    const types: AboutSection["type"][] = [
      "normal",
      "highlight",
      "quote",
      "final",
    ];
    const current = aboutData.sections[index].type;
    const nextIdx = (types.indexOf(current) + 1) % types.length;
    const updated = [...aboutData.sections];
    updated[index] = { ...updated[index], type: types[nextIdx] };
    updateMutation.mutate({ sections: updated });
  };

  const handleAddSection = () => {
    if (!aboutData) return;
    const updated = [
      ...aboutData.sections,
      {
        text: "ახალი სექცია...",
        textEn: "New section...",
        type: "normal" as const,
      },
    ];
    updateMutation.mutate({ sections: updated });
  };

  const handleDeleteSection = (index: number) => {
    if (!aboutData) return;
    const updated = aboutData.sections.filter((_, i) => i !== index);
    updateMutation.mutate({ sections: updated });
  };

  const playBeepSound = () => {
    const audio = new Audio("/beep.wav");
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log("Sound play failed:", error);
    });
    setIsPressed(true);
    setShowParticles(true);
    setTimeout(() => setIsPressed(false), 200);
    setTimeout(() => setShowParticles(false), 1000);
  };

  const isEn = language === "en";
  const title =
    (isEn ? aboutData?.titleEn : aboutData?.title) ||
    (isEn ? "About Us" : "ჩვენ შესახებ");
  const brandIntroTitle =
    (isEn ? aboutData?.brandIntroTitleEn : aboutData?.brandIntroTitle) ||
    "GalaKids -";
  const brandIntroText =
    (isEn ? aboutData?.brandIntroTextEn : aboutData?.brandIntroText) ||
    (isEn
      ? "A brand created with love, care and the belief that childhood means freedom."
      : "ეს არის ბრენდი, რომელიც სიყვარულით, ზრუნვითა და იმ რწმენით შეიქმნა, რომ ბავშვობა თავისუფლებას ნიშნავს.");
  const sections = aboutData?.sections || [];
  const ctaText =
    (isEn ? aboutData?.ctaTextEn : aboutData?.ctaText) ||
    (isEn
      ? "Dress your little ones in GalaKids!"
      : "ჩააცვი შენს პატარებს GalaKids!");
  const ctaHighlight =
    (isEn ? aboutData?.ctaHighlightEn : aboutData?.ctaHighlight) ||
    (isEn ? "Because kids deserve the best!" : "რადგან ბავშვები საუკეთესოს იმსახურებენ!");
  const creatorsTitle =
    (isEn ? aboutData?.creatorsTitleEn : aboutData?.creatorsTitle) ||
    (isEn
      ? "Meet the creators!"
      : "გაიცანი შემქმნელები!");

  const titleField = isEn ? "titleEn" : "title";
  const brandIntroTitleField = isEn ? "brandIntroTitleEn" : "brandIntroTitle";
  const brandIntroTextField = isEn ? "brandIntroTextEn" : "brandIntroText";
  const ctaTextField = isEn ? "ctaTextEn" : "ctaText";
  const ctaHighlightField = isEn ? "ctaHighlightEn" : "ctaHighlight";
  const creatorsTitleField = isEn ? "creatorsTitleEn" : "creatorsTitle";

  const creatorImg1 = aboutData?.creatorImage1 || "";
  const creatorImg2 = aboutData?.creatorImage2 || "";
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    file: File,
    field: "creatorImage1" | "creatorImage2",
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await apiClient.post(
        "/settings/about/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      updateMutation.mutate({ [field]: res.data.url });
    } catch (e) {
      console.error("Image upload failed:", e);
    }
  };

  const typeLabels: Record<AboutSection["type"], string> = {
    normal: "ჩვეულ.",
    highlight: "გამორჩ.",
    quote: "ციტატა",
    final: "ფინალი",
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <div className="logo-decoration floating-logo">
            <div
              className={`logo-wrapper ${isPressed ? "pressed" : ""}`}
              onClick={playBeepSound}
            >
              <Image
                src={logo}
                width={300}
                height={200}
                alt="GalaKids logo"
                className="about-logo"
              />
              {showParticles && (
                <div className="sound-particles">
                  <span>🎵</span>
                  <span>🎶</span>
                  <span>💖</span>
                  <span>✨</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h1 className="about-title">
          {title}
          {isAdmin && (
            <EditableText
              value={title}
              onSave={(val) =>
                handleFieldUpdate(titleField as keyof AboutPageData, val)
              }
            />
          )}
        </h1>

        <div className="about-text">
          <div className="brand-intro">
            <h2>
              {brandIntroTitle}
              {isAdmin && (
                <EditableText
                  value={brandIntroTitle}
                  onSave={(val) =>
                    handleFieldUpdate(
                      brandIntroTitleField as keyof AboutPageData,
                      val,
                    )
                  }
                />
              )}
              <span>
                {brandIntroText}
                {isAdmin && (
                  <EditableText
                    value={brandIntroText}
                    onSave={(val) =>
                      handleFieldUpdate(
                        brandIntroTextField as keyof AboutPageData,
                        val,
                      )
                    }
                  />
                )}
              </span>
            </h2>
          </div>

          {sections.map((section, idx) => {
            const sectionText = isEn
              ? section.textEn || section.text
              : section.text;
            if (section.type === "quote") {
              return (
                <div key={idx} className="about-section">
                  <div className="quote">&ldquo;{sectionText}&rdquo;</div>
                  {isAdmin && (
                    <div className="about-section-admin">
                      <EditableText
                        value={sectionText}
                        onSave={(val) => handleSectionTextUpdate(idx, val)}
                      />
                      <button
                        className="about-type-toggle"
                        onClick={() => handleSectionTypeToggle(idx)}
                        title={typeLabels[section.type]}
                      >
                        {typeLabels[section.type]}
                      </button>
                      <button
                        className="about-delete-btn"
                        onClick={() => handleDeleteSection(idx)}
                        title="წაშლა"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            const sectionClass =
              section.type === "highlight"
                ? "about-section highlight"
                : section.type === "final"
                  ? "about-section final"
                  : "about-section";

            return (
              <div className={sectionClass} key={idx}>
                <p>{sectionText}</p>
                {isAdmin && (
                  <div className="about-section-admin">
                    <EditableText
                      value={sectionText}
                      onSave={(val) => handleSectionTextUpdate(idx, val)}
                      multiline
                    />
                    <button
                      className="about-type-toggle"
                      onClick={() => handleSectionTypeToggle(idx)}
                      title={typeLabels[section.type]}
                    >
                      {typeLabels[section.type]}
                    </button>
                    <button
                      className="about-delete-btn"
                      onClick={() => handleDeleteSection(idx)}
                      title="წაშლა"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div className="call-to-action">
            <p>
              {ctaText}
              {isAdmin && (
                <EditableText
                  value={ctaText}
                  onSave={(val) =>
                    handleFieldUpdate(ctaTextField as keyof AboutPageData, val)
                  }
                />
              )}
            </p>
            <div className="cta-highlight lastCta">
              {ctaHighlight}
              {isAdmin && (
                <EditableText
                  value={ctaHighlight}
                  onSave={(val) =>
                    handleFieldUpdate(
                      ctaHighlightField as keyof AboutPageData,
                      val,
                    )
                  }
                />
              )}
            </div>
          </div>

          {isAdmin && (
            <button
              className="about-add-section-btn"
              onClick={handleAddSection}
            >
              <Plus size={18} /> სექციის დამატება
            </button>
          )}
        </div>

        <h3 className="about-title">
          {creatorsTitle}
          {isAdmin && (
            <EditableText
              value={creatorsTitle}
              onSave={(val) =>
                handleFieldUpdate(
                  creatorsTitleField as keyof AboutPageData,
                  val,
                )
              }
            />
          )}
        </h3>

        <div className="creators">
          <div className="creator-image-wrap">
            {creatorImg1 ? (
              <img src={creatorImg1} alt="Creator 1" className="creator-img" />
            ) : (
              <Image src={creator1} alt="Creator 1" />
            )}
            {isAdmin && (
              <>
                <button
                  className="creator-upload-btn"
                  onClick={() => fileInputRef1.current?.click()}
                  title="სურათის შეცვლა"
                >
                  <Camera size={18} />
                </button>
                <input
                  ref={fileInputRef1}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "creatorImage1");
                    e.target.value = "";
                  }}
                />
              </>
            )}
          </div>
          <div className="creator-image-wrap">
            {creatorImg2 ? (
              <img src={creatorImg2} alt="Creator 2" className="creator-img" />
            ) : (
              <Image src={creator2} alt="Creator 2" />
            )}
            {isAdmin && (
              <>
                <button
                  className="creator-upload-btn"
                  onClick={() => fileInputRef2.current?.click()}
                  title="სურათის შეცვლა"
                >
                  <Camera size={18} />
                </button>
                <input
                  ref={fileInputRef2}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "creatorImage2");
                    e.target.value = "";
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
