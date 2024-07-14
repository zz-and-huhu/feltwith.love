"use client";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  InstapaperIcon,
} from "react-share";
import { ShareButtonProps } from "./Types";
import {
  ShareLinkedinIcon,
  ShareTwitterIcon,
  ShareFaceBookIcon,
  ShareLinkIcon,
} from "@/public/icons/Index";
import { copyToCommand } from "@/components/Common/CopyToCommand";
import { useState } from "react";

export const ShareButton = (props: ShareButtonProps) => {
  const { url, quote } = props;
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    copyToCommand(url, () => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    });
  };

  return (
    <div>
      <TwitterShareButton url={url} title={quote}>
        <ShareTwitterIcon />
      </TwitterShareButton>
      <FacebookShareButton url={url} title={quote}>
        <ShareFaceBookIcon />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={quote}>
        <ShareLinkedinIcon />
      </LinkedinShareButton>
      <button onClick={handleCopy} aria-label="Share Link">
        <ShareLinkIcon />
      </button>
    </div>
  );
};
