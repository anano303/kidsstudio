"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  Pencil,
  Check,
  X,
} from "lucide-react";
import logo from "../../assets/Images/galakids-logo.svg";
import { useLanguage } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Role } from "@/types/role";
import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./footer.css";

interface FooterSettings {
  message: string;
  messageEn: string;
  address: string;
  addressEn: string;
  email: string;
  phone: string;
  facebookUrl: string;
  instagramUrl: string;
  contactEmail: string;
}

function EditableField({
  value,
  fieldKey,
  isAdmin,
  onSave,
  className,
  as: Tag = "span",
  hideValue = false,
}: {
  value: string;
  fieldKey: string;
  isAdmin: boolean;
  onSave: (key: string, value: string) => void;
  className?: string;
  as?: "span" | "p";
  hideValue?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    if (draft.trim() && draft !== value) {
      onSave(fieldKey, draft.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  if (editing) {
    return (
      <span className="editable-field-editing">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          className="editable-field-input"
        />
        <button
          onClick={handleSave}
          className="editable-field-btn save"
          title="შენახვა"
        >
          <Check size={14} />
        </button>
        <button
          onClick={handleCancel}
          className="editable-field-btn cancel"
          title="გაუქმება"
        >
          <X size={14} />
        </button>
      </span>
    );
  }

  if (hideValue) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="editable-field-pencil"
        title="რედაქტირება"
      >
        <Pencil size={13} />
      </button>
    );
  }

  return (
    <Tag className={className}>
      {value}
      {isAdmin && (
        <button
          onClick={() => setEditing(true)}
          className="editable-field-pencil"
          title="რედაქტირება"
        >
          <Pencil size={13} />
        </button>
      )}
    </Tag>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted && user?.role === Role.Admin;

  const { data: settings } = useQuery<FooterSettings>({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const res = await apiClient.get("/settings/footer");
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<FooterSettings>) => {
      const res = await apiClient.put("/settings/footer", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["footer-settings"], data);
    },
  });

  const handleSave = (key: string, value: string) => {
    updateMutation.mutate({ [key]: value });
  };

  const message =
    (language === "en" ? settings?.messageEn : settings?.message) ||
    t("footer.beforeYouLeave");
  const address =
    (language === "en" ? settings?.addressEn : settings?.address) ||
    t("footer.address");
  const email = settings?.email || t("footer.email");
  const phone = settings?.phone || t("footer.phone");
  const messageFieldKey = language === "en" ? "messageEn" : "message";
  const addressFieldKey = language === "en" ? "addressEn" : "address";
  const facebookUrl =
    settings?.facebookUrl ||
    "https://www.facebook.com/profile.php?id=61574139157964";
  const instagramUrl =
    settings?.instagramUrl ||
    "https://www.instagram.com/galakids?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
  const contactEmail = settings?.contactEmail || "info@galakids.ge";

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <ul className="footer-link-list">
            <li>
              <Link href="/home" className="footer-link">
                {t("navigation.homePage")}
              </Link>
            </li>
            <li>
              <Link href="/shop" className="footer-link">
                {t("navigation.shop")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                {t("navigation.about")}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="footer-link">
                {t("footer.privacyPolicy")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="footer-links">
            <div className="footer-message-logo-container">
              <div className="footer-message-container">
                <EditableField
                  value={message}
                  fieldKey={messageFieldKey}
                  isAdmin={isAdmin}
                  onSave={handleSave}
                  className="footer-message"
                  as="p"
                />
                <address className="footer-contact">
                  <div className="top-contacts">
                    <EditableField
                      value={address}
                      fieldKey={addressFieldKey}
                      isAdmin={isAdmin}
                      onSave={handleSave}
                      as="p"
                    />
                    <EditableField
                      value={email}
                      fieldKey="email"
                      isAdmin={isAdmin}
                      onSave={handleSave}
                      as="p"
                    />
                  </div>
                  <EditableField
                    value={phone}
                    fieldKey="phone"
                    isAdmin={isAdmin}
                    onSave={handleSave}
                    className="bottom-contact"
                    as="p"
                  />
                </address>
                <div className="footer-social">
                  <div className="social-icons">
                    <span className="social-editable-group">
                      <a
                        href={facebookUrl}
                        className="social-icon-wrapper"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookIcon
                          className="social-icon facebook-icon"
                          fill="white"
                          stroke="#CF0A0A"
                          strokeWidth={2}
                          style={{
                            backgroundColor: "#CF0A0A",
                            borderRadius: "5px",
                            padding: "2px",
                          }}
                        />
                        <span className="social-name">Facebook</span>
                      </a>
                      {isAdmin && (
                        <EditableField
                          value={facebookUrl}
                          fieldKey="facebookUrl"
                          isAdmin={isAdmin}
                          onSave={handleSave}
                          hideValue
                        />
                      )}
                    </span>
                    <span className="social-editable-group">
                      <a
                        href={instagramUrl}
                        className="social-icon-wrapper"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InstagramIcon
                          className="social-icon"
                          fill="#CF0A0A"
                          stroke="white"
                          strokeWidth={2}
                        />
                        <span className="social-name">Instagram</span>
                      </a>
                      {isAdmin && (
                        <EditableField
                          value={instagramUrl}
                          fieldKey="instagramUrl"
                          isAdmin={isAdmin}
                          onSave={handleSave}
                          hideValue
                        />
                      )}
                    </span>
                    <span className="social-editable-group">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="social-icon-wrapper"
                        aria-label="Email"
                      >
                        <MailIcon
                          className="social-icon"
                          fill="#CF0A0A"
                          stroke="white"
                          strokeWidth={2}
                        />
                        <span className="social-name">Email</span>
                      </a>
                      {isAdmin && (
                        <EditableField
                          value={contactEmail}
                          fieldKey="contactEmail"
                          isAdmin={isAdmin}
                          onSave={handleSave}
                          hideValue
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="footer-column text-start">
                <div className="footer-logo">
                  <Image
                    src={logo}
                    alt="GalaKids Logo"
                    width={320}
                    height={190}
                    className="footer-logo-image"
                  />
                </div>

                <p className="copyright">
                  {t("footer.copyright")}
                  <a
                    href="https://bestsoft.ge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="bestsoft">BESTSOFT.GE</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom"></div>
      </div>
    </footer>
  );
}
