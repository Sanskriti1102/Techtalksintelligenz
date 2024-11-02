document.addEventListener("DOMContentLoaded", function() {
    function createMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }

    function createMetaProperty(property, content) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
    }

    createMetaTag('description', 'Tech Talks X IntelligenZ - A platform fostering innovation, providing resources, and building a tech-savvy community with blogs, resources, community events, and a knowledge hub.');
    createMetaTag('keywords', 'Tech Talks, IntelligenZ, innovation, technology, community, resources, events, knowledge hub');
    createMetaTag('author', 'Tech Talks X IntelligenZ Team');
    createMetaTag('robots', 'index, follow');
    createMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    createMetaTag('theme-color', '#2D9CDB'); 

    createMetaProperty('og:type', 'website');
    createMetaProperty('og:title', 'Tech Talks X IntelligenZ - Fostering Innovation and Building Community');
    createMetaProperty('og:description', 'Join Tech Talks X IntelligenZ for the latest in tech trends, community events, and a knowledge hub dedicated to fostering innovation and tech expertise.');
    createMetaProperty('og:image', 'https://techtalksintelligenz.vercel.app/og-image.png'); 
    createMetaProperty('og:url', 'https://techtalksintelligenz.vercel.app/');
    createMetaProperty('og:site_name', 'Tech Talks X IntelligenZ');

    createMetaTag('twitter:card', 'summary_large_image');
    createMetaTag('twitter:title', 'Tech Talks X IntelligenZ - Fostering Innovation and Building Community');
    createMetaTag('twitter:description', 'Stay updated on tech trends and community events with Tech Talks X IntelligenZ, your hub for resources and innovation.');
    createMetaTag('twitter:image', 'https://techtalksintelligenz.vercel.app/og-image.png'); 
    createMetaTag('twitter:site', '@YourTwitterHandle'); 

    const linkFavicon = document.createElement('link');
    linkFavicon.rel = 'icon';
    linkFavicon.href = '/favicon.ico';
    document.head.appendChild(linkFavicon);

    const linkAppleTouchIcon = document.createElement('link');
    linkAppleTouchIcon.rel = 'apple-touch-icon';
    linkAppleTouchIcon.href = '/apple-touch-icon.png';
    document.head.appendChild(linkAppleTouchIcon);
});
