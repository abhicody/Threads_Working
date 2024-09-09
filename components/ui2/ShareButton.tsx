"use client";

import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

const ShareButtons = () => {
  const shareUrl = "http://localhost:3000"; // Replace with your URL

  return (
    <div className="flex items-center justify-between ml-5">
      {/* <div className="text-small-medium mr-5">
        <h1 className="text-white">Share this page</h1>
      </div> */}
      <div className="mt-1">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={20} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={20} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={20} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
