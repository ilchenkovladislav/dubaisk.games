const isDevelopment = chrome.runtime.id === 'hmkiocceebnkbjmpcalijcklehkcagld'

export const API_CONFIG = {
  BASE_URL: isDevelopment ? 'http://localhost:3000/api/' : 'https://your-production-api.com/api/',
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  COOKIE: `activePWA=false; mindboxDeviceUUID=2465c5db-c4ed-43b6-aa97-3e3d7c0afce0; directCrm-session=%7B%22deviceGuid%22%3A%222465c5db-c4ed-43b6-aa97-3e3d7c0afce0%22%7D; cf_clearance=T31yWUeDRivrkYqKMWa5SaYlfbJa0457l1pddmSUVpA-1743515400-1.2.1.1-gYON1TyFZ6rMCg8xN.N0gGf6H9Zy.oHt8tO9jyRGRYqCAa3EuPcv1cDMXhj5DNaKSV3e0SkkXCLk.vdmTjg0WChWjHi.599giBAsgfNqz3V_oaVwhy.8U4vDOQjB27TeCIyq77WQTOJvmg7URlPaAnaj_CVq3OdXydF9zh6N3SjxEc9NQGrDDVyfPbDfV3xJ0Lyk.wKTLiuhwUwhh4kjCL6IyrioaDTDPenFDZyMIysovgfqnJfs9MzsPxdgboCedcv37Rm6fn21.vhDBSLaCPzNc4ZH6h5szvuW9GSauxY0o83pVPkolvDT1As2jbS5cmC_0CnfegMIg2dxVnXr2Q23V2yIQ9ZKxvrkTVXLcPU; popmechanic_sbjs_migrations=popmechanic_1418474375998%3D1%7C%7C%7C1471519752600%3D1%7C%7C%7C1471519752605%3D1; _ym_uid=1743515450852740016; _ym_d=1743515450; _ga=GA1.1.89770938.1743515450; utm=%7B%22utm_source%22%3A%22yandex%22%2C%22utm_medium%22%3A%22cpc%22%2C%22utm_campaign%22%3A%22119815231%22%2C%22utm_content%22%3A%2216977784672%22%2C%22utm_term%22%3A%22---autotargeting%22%2C%22ai%22%3A%221310677%22%2C%22yclid%22%3A%2215365768945830723583%22%7D; NEXT_LOCALE=ru; curr=wmr; ip=45.149.234.53; branch=MAIN; activePWA=false; is_first_visit=false; _ym_isad=1; _ym_visorc=b; geo_user=NL; _ga_6QVFBL8H0P=GS2.1.s1752406541$o18$g1$t1752406955$j59$l0$h0`,
}
