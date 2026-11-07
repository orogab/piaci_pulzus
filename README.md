Az oldal egyetlen HTML-fájl, bárhol hosztolható (GitHub Pages, Netlify, saját szerver). Az adatokat a böngészőből kéri le, percenként magától frissül, és van “Frissítés most” gomb is. A kérdésemre a sorszámmal válaszoltál, ezt a saját hosztolásra értettem. Mivel a tartalomra nem adtál preferenciát, mind a négy csoport benne van:

Tőzsdeindexek: S&P 500, Nasdaq, Dow Jones, DAX, BUX és Nikkei, Yahoo Finance adataival.
Forintárfolyamok: EUR, USD, CHF és GBP forintban, a Frankfurter (EKB) adataival, napi frissítéssel.
Kripto: Bitcoin és Ethereum dollárban, CoinGecko adataival.
Nyersanyagok: arany, Brent olaj és földgáz, Yahoo Finance adataival.

Egy dolgot be kell állítanod. A Yahoo Finance nem engedi, hogy egy weboldal közvetlenül lekérje az adatait, ezért az indexek és a nyersanyagok proxyn keresztül mennek:

Ajánlott megoldás: telepítsd a worker.js-t egy ingyenes Cloudflare Workerként, és írd a címét az index.html elején a CONFIG.proxy mezőbe. Ezt csak engedélyezett Yahoo-címekre használja, és 30 másodpercre gyorsítótárazza a válaszokat.
Proxy nélkül: az oldal egy nyilvános proxyt (corsproxy.io) próbál használni, de az megbízhatatlan, és előfordulhat, hogy az indexek és a nyersanyagok nem töltődnek be.
