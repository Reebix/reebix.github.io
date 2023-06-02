function toggleDarkMode() {
    const html = document.querySelector('html');
    if (html.hasAttribute('dark')) {
        html.removeAttribute('dark');
        document.querySelector('.toggle-button').classList.remove('toggle-button-dark');
        document.querySelector('.toggle-button').classList.add('toggle-button-light');
        document.querySelector('.toggle-image-light').style.display = 'inline';
        document.querySelector('.toggle-image-dark').style.display = 'none';
    } else {
        html.setAttribute('dark', '');
        document.querySelector('.toggle-button').classList.remove('toggle-button-light');
        document.querySelector('.toggle-button').classList.add('toggle-button-dark');
        document.querySelector('.toggle-image-light').style.display = 'none';
        document.querySelector('.toggle-image-dark').style.display = 'inline';
    }
}