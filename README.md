# cross-origin-local-storage.js
manage localstorage of iframe from main domain  (original https://gist.github.com/buren/8d7c831822bc474164cc37dd522c2d1d)

Task: set/set/remove localstorage of iframe on other domain.

1. Use VSCode for quick demo of the code.
2. main domain: '127.0.0.1:8000', iframe domain: '127.0.0.1:4200'
3. iframe has callback function (alert) to our main domaing after setting the localstorage
