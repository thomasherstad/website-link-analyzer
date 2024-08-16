const { normalizeURL, getURLsFromHTML } = require('./crawl');

test('Test / http', () => {
    const url = 'http://blog.boot.dev/path/';
    const normalized = 'blog.boot.dev/path';
    expect(normalizeURL(url)).toBe(normalized);
  });

test('Test / https', () => {
    const url = 'https://blog.boot.dev/path/';
    const normalized = 'blog.boot.dev/path';
    expect(normalizeURL(url)).toBe(normalized);
});


test('Test many paths', () => {
    const url = 'https://blog.boot.dev/path/path2/path3/';
    const normalized = 'blog.boot.dev/path/path2/path3';
    expect(normalizeURL(url)).toBe(normalized);
});


test('Test no slash', () => {
    const url = 'https://blog.boot.dev/path';
    const normalized = 'blog.boot.dev/path';
    expect(normalizeURL(url)).toBe(normalized);
});


test('Test capitals', () => {
    const url = 'https://blog.BOOT.DEV/path/';
    const normalized = 'blog.boot.dev/path';
    expect(normalizeURL(url)).toBe(normalized);
});

test('Test get URL normal', () => {
  const html = '<a href="https://boot.dev/scripts">Learn Backend Development</a>';
  const expected = ['https://boot.dev/scripts']
  expect(getURLsFromHTML(html, 'boot.dev'))
});

test('Test get URL bigger body', () => {
    const html = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <div>Hello</div>
            <a href="https://blog.boot.dev/v1/api"><span>Go to Boot.dev apis</span></a>
            <a href="https://apple.com"><span>Go to Apple.com</span></a>
        </body>
    </html>
    `;
    const expected = ['https://blog.boot.dev', 'https://blog.boot.dev/v1/api', 'https://apple.com'];
    expect(getURLsFromHTML(html, expected));
});