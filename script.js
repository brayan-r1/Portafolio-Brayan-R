
const menu = document.getElementById('menu');
const nav = document.getElementById('nav');

menu.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');

    menu.setAttribute('aria-expanded', String(opened));
    menu.textContent = opened ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.textContent = '☰';
    });
});


document.getElementById('theme').addEventListener('click', () => {
    document.body.classList.toggle('light');
});


const progress = document.getElementById('progress');
const topBtn = document.getElementById('top');

function scrollState() {
    const max = document.documentElement.scrollHeight - innerHeight;

    progress.style.width = (max ? scrollY / max * 100 : 0) + '%';

    topBtn.classList.toggle('show', scrollY > 450);
}

addEventListener('scroll', scrollState, { passive: true });

scrollState();

topBtn.addEventListener('click', () => {
    scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('.filter').forEach(filter => {
            filter.classList.remove('active');
        });

        button.classList.add('active');

        const filterType = button.dataset.filter;

        document.querySelectorAll('.project').forEach(card => {
            card.classList.toggle(
                'hidden',
                filterType !== 'all' && card.dataset.kind !== filterType
            );
        });

    });
});


const modal = document.getElementById('modal');

document.querySelectorAll('.cert').forEach(card => {
    card.addEventListener('click', () => {

        document.getElementById('modalTitle').textContent = card.dataset.title;

        document.getElementById('modalImage').src = card.dataset.image;

        document.getElementById('pdfLink').href = card.dataset.pdf;

        modal.classList.add('open');

        modal.setAttribute('aria-hidden', 'false');

    });
});


function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

modal.querySelectorAll('[data-close]').forEach(element => {
    element.addEventListener('click', closeModal);
});

addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});


document.getElementById('copy').addEventListener('click', async () => {

    const toast = document.getElementById('toast');

    try {
        await navigator.clipboard.writeText('brayan.rivxs@gmail.com');

        toast.textContent = 'Email copied to clipboard';

    } catch {
        toast.textContent = 'Email: brayan.rivxs@gmail.com';
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);

});


if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {

    document.body.classList.add('reveal-ready');

    const revealItems = document.querySelectorAll(
        '.section-head, .about-grid, .timeline, .project, .skill, .experience, .program, .cert, .contact-details'
    );

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('is-visible');

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

}


const navLinks = [
    ...document.querySelectorAll('#nav a[href^="#"]')
];

const trackedSections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);


if ('IntersectionObserver' in window) {

    const navObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.toggle(
                        'current',
                        link.getAttribute('href') === '#' + entry.target.id
                    );

                });

            }

        });

    }, {
        rootMargin: '-28% 0px -62% 0px'
    });

    trackedSections.forEach(section => {
        navObserver.observe(section);
    });

}

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', event => {

        event.preventDefault();

        const name = document.getElementById('visitorName').value.trim();
        const email = document.getElementById('visitorEmail').value.trim();
        const message = document.getElementById('visitorMessage').value.trim();

        if (!name || !email || !message) {
            return;
        }

        const subject = encodeURIComponent(
            'Portfolio contact from ' + name
        );

        const body = encodeURIComponent(
            'Name: ' + name +
            '\nEmail: ' + email +
            '\n\nMessage:\n' + message
        );

        window.location.href =
            'mailto:brayan.rivxs@gmail.com?subject=' +
            subject + '&body=' + body;

    });

}