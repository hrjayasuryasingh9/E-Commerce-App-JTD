const { Pool } = require("pg");
const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_da0-TlwbiZCc7KDfBpB",
  host: "pg-10045fdf-hrjayasuryasingh-40eb.l.aivencloud.com",
  port: 27090,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUcAIZD6ofTePubz6b0+UpUXgzOu4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTM3YmE3Y2YtZmE1ZS00NWUzLWIwYmItZWZlNTk2MDhk
N2I1IFByb2plY3QgQ0EwHhcNMjUwMTIwMTAxNjQ4WhcNMzUwMTE4MTAxNjQ4WjA6
MTgwNgYDVQQDDC9lMzdiYTdjZi1mYTVlLTQ1ZTMtYjBiYi1lZmU1OTYwOGQ3YjUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKMn5Twn
g+4kzOSM5MaBf8/1f+YOs861uXKswJjIfrzVnquI9oW87nsxtSWC7hhYjYX80Fbw
qNixj91DPfJ0I/80yDlVRk31P6JlNq7he2YJSTI3jeKg32e4ViTTbWApUmfGm2JB
zQlxvnT0Y62Or/pfjkz12+feS6xtCSHj3YYjCADk/T+go24n6vp9CSZiEjzzrwb/
iEd5/4ic+WSVaZd6zxIlM1Xm6QHsF+3zCcR9IhIBHvhQTMcV0lqcsHXpC766HY/j
rrij1g36UE54Xn34pjRjY/fZA2Ql302B45GlP/7GPM4pTGBe59S7+WMPufvWUXku
uLo04ns+mA+MJpuBOVwNBSOCSaD+O6lYjPuI/7ef6FWZQ6jZzCOxoylIa+sNppe1
0CZ+UOxke8eaikNEJxFB/0l/DD3IVKQ523wYhm+2b4GfGX7sodaeWZ9yKgqHgmEc
WIJ25kABmu+Vu9i8T643CAeQb9fbFegxFQUxgOpkBGNQK4BQWcZhFQiEEQIDAQAB
oz8wPTAdBgNVHQ4EFgQU+nwZP828LpBNZityU5456BTA3GcwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABxBrnvJU3T1H2Ho
DubRQEoiNwPmTqKphMfV2ZmWz3pxlK8UgFh7ofu+uPPps53fXr7UixjrIJXZCeZM
xg+40TuXcI0ZJyGZZ6Z0Fex/lnolaWf7AiD5g7FrK2I+ClHad5Qq8u6Dbc0lGGzW
4g7p7PKGzOUgQ9336FWbqtR40dxbgTB0SOaNI9IJ351QHpZzxNAU8U5MbpUNdHJm
PO18J/KpNK2TZo3ZWVy3/MEYJeByG+OWk8Aw1IIrcNWyfo2qSrt6qyyevMKYFeAk
85BtTpJJ60e3/vLvZOuNNo0Gz02si11HAKr5KApLCHflaZO8lvSUCrgFni/CunS/
R1KNCASU4Lp0nm/vA2T/Cvi7qk/XGFP6UrDgDR54BHa3KuWHhDV1a+O1bdjnG6JQ
nu+2HiedxlX+e8qrhBUklto/HksfR9vdSa15JNkzvIR1SWVet/OuDzjk4fkxBHDD
JmTO3E9wFCYthJsCGpKrnv6q7uCgd5Opcs43cznK3KbCai1vJQ==
-----END CERTIFICATE-----`,
  },
});

module.exports = pool;
