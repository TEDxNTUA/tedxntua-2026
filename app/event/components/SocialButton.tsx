"use client";
import { useState } from 'react';

export default function TEDSocialButton({ name, size, color, colorHover }: { name: string; size: string, color: string, colorHover:string  }) {
    const [style, setStyle] = useState("green"); 
    
    // CHANGE: Remove the dots. Use a leading slash.
    // This assumes your folder is at: public/images/youtube/youtube-black.png
    const basePath = "/eventimages"; 
    const extension = "png";

    let link = "";
    if (name === "youtube") {
        link = "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU";
    } else if (name === "facebook") {
        link = "https://www.facebook.com/tedxntua";
    } else if (name === "tiktok") {
        link = "https://www.tiktok.com/@tedxntua";
    } else if (name === "instagram") {
        link = "https://www.instagram.com/tedxntua/";
    } else if (name === "linkedIn") {
        link = "https://www.linkedin.com/company/tedxntua";
    }

    const lowerName = name.toLowerCase();
    
    // This creates: /images/youtube/youtube-black.png
    const image = `${basePath}/${lowerName}/${lowerName}-${style}.${extension}`;

    return (
        <div className="inline-block">
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setStyle("yellow")}
                onMouseLeave={() => setStyle("green")}
                className="cursor-pointer" 
            >
                <img 
                    src={image} 
                    alt={name} 
                    // Use standard CSS units if size doesn't include them (e.g., '40px')
                    style={{ height: size, width: size }} 
                    className="object-contain transition-opacity duration-300"
                    // Debugging helper: logs the path to console if it fails
                    onError={() => console.error("Failed to load image at:", image)}
                />
            </a>
        </div>
    );
}


export function SocialButton({ name, urlLink, size }: { name: string, urlLink: string, size: string }) {
    const [style, setStyle] = useState("green");

    const basePath = "../images";
    const extension = "png";
    const lowerName = name.toLowerCase();

    const image = `${basePath}/${lowerName}/${lowerName}-${style}.${extension}`;

    return (
        <div className="inline-block">
            <a 
                href={urlLink} 
                target="_blank" 
                rel="noopener noreferrer"
                // 4. Trigger the style change on hover
                onMouseEnter={() => setStyle("yellow")}
                onMouseLeave={() => setStyle("green")}
            >
                <img 
                    src={image} 
                    alt={name} 
                    style={{ height: size, width: size }} 
                    className="object-contain transition-all duration-300"
                />
            </a>
        </div>
    );
}
