import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const exportHTML = async (): Promise<void> => {
  const zip = new JSZip();

  // Wait for any animations or transitions to complete
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Capture the current state of the DOM
  const content = document.querySelector('#content');
  if (!content) {
    console.error('Content element not found');
    return;
  }

  // Create a new HTML document
  const doc = document.implementation.createHTMLDocument('Exported Report');

  // Copy the <head> content
  doc.head.innerHTML = document.head.innerHTML;

  // Remove unnecessary tags from the head
  const tagsToRemove = [
    'script',
    'noscript',
    'link[rel="preload"]',
    'link[rel="preconnect"]',
    'link[rel="dns-prefetch"]',
  ];
  tagsToRemove.forEach((selector) => {
    doc.head.querySelectorAll(selector).forEach((el) => el.remove());
  });

  // Inline all stylesheets
  const styles = doc.head.querySelectorAll('link[rel="stylesheet"]');
  for (const style of styles) {
    if (style instanceof HTMLLinkElement && style.href) {
      try {
        const response = await fetch(style.href);
        const css = await response.text();
        const inlineStyle = doc.createElement('style');
        inlineStyle.textContent = css;
        style.parentNode?.replaceChild(inlineStyle, style);
      } catch (error) {
        console.error(`Failed to fetch stylesheet: ${style.href}`, error);
      }
    }
  }

  // Copy the content
  doc.body.innerHTML = `
      <div id="content">
        ${content.innerHTML}
      </div>
    `;

  // Remove interactive elements from the NavBar
  const navbarButtons = doc.body.querySelectorAll('nav button');
  navbarButtons.forEach((button) => button.remove());

  // Process images
  const images = doc.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (img.src) {
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const imgFileName = `images/image${i}.${blob.type.split('/')[1]}`;
        zip.file(imgFileName, blob);
        img.src = imgFileName;
      } catch (error) {
        console.error(`Failed to fetch image: ${img.src}`, error);
      }
    }
  }

  // Add necessary scripts
  const scriptContent = `
      // Add any necessary JavaScript here
      document.addEventListener('DOMContentLoaded', function() {
        // Initialize any components or functionality here
      });
    `;
  const scriptTag = doc.createElement('script');
  scriptTag.textContent = scriptContent;
  doc.body.appendChild(scriptTag);

  // Get the final HTML content
  const finalHtmlContent = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;

  // Add the HTML file to the zip
  zip.file('report.html', finalHtmlContent);

  // Generate the zip file
  const zipContent = await zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(zipContent, 'report.zip');
};
