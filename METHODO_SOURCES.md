# Note Méthodologique & Sources — Dashboard CI Bollinger

**Date de production :** Mars 2026  
**Auteur :** Dashboard généré par agent IA (Manus) — rôle : consultant senior Competitive Intelligence (luxe/vins & spiritueux) + Product Manager BI  
**Langue :** Français  
**Périmètre :** Champagne Bollinger + competitive set de 9 maisons

---

## 1. Processus de collecte des données

### 1.1 Source primaire (tentative d'ingestion)

La source de départ désignée (`https://alex.serviceplan-agents.com/files/tasks/.../bollinger_competitive_dashboard.html`) a retourné une erreur d'authentification (`Missing token`) lors de l'accès via navigateur et via requête HTTP directe. Le contenu n'était pas accessible publiquement. **La construction du dashboard a donc été réalisée intégralement à partir de recherches web complémentaires**, sans dépendance à ce fichier source.

### 1.2 Recherche web complémentaire

Les données ont été collectées via une série de recherches structurées couvrant :

| Thème | Requêtes types | Sources consultées |
|-------|---------------|-------------------|
| Performance marché 2024–2025 | "Champagne shipments 2025", "Bollinger 2024 sales volume" | Comité Champagne, The Drinks Business, The Finest Bubble |
| Classements prestige | "Most Admired Champagne Brands 2025 2026" | Drinks International, Wine Intelligence, The Finest Bubble |
| Partenariats & actualités Bollinger | "Bollinger Aston Martin 2025", "Bollinger 007 2025" | Aston Martin press, PR Newswire, Drinks Business |
| Prix & comparatif | "Bollinger Special Cuvée price 2025", "Krug Dom Perignon price comparison" | Wine-Searcher, Enosearcher, Premier Champagne |
| Distribution & marchés | "Top 10 champagne markets 2024" | The Drinks Business (mars 2025) |
| Digital & social | "Bollinger Instagram followers 2025" | Instagram (comptes officiels) |
| Risques & signaux faibles | "Bollinger VVF phylloxera", "Trump tariffs French wine 2025" | Bloomberg, Champagne Club, Reuters, NPR |
| ESG & durabilité | "Bollinger B Corp certification" | Bollinger.com, Decanter, The Drinks Business |

### 1.3 Navigation directe sur les sources

Les URLs identifiées lors des recherches ont été consultées directement pour extraire le contenu complet (pas uniquement les snippets) :

- **The Drinks Business** (mars 2025) : tableau complet des 10 premiers marchés export champagne 2024
- **The Finest Bubble** (mars 2025) : classement complet Most Admired 2025 (40 maisons)
- **Wine Intelligence** (mars 2026) : classement Most Admired 2026 + contexte marché

---

## 2. Justification du competitive set

Le competitive set de 9 maisons a été sélectionné selon 4 critères cumulatifs :

| Critère | Seuil retenu |
|---------|-------------|
| **Positionnement** | Prestige ou ultra-prestige (pas de marques de volume) |
| **Fourchette de prix** | Entrée de gamme > 45€/btl |
| **Distribution** | Présence internationale (≥ 5 marchés clés) |
| **Notoriété professionnelle** | Présence dans le Top 10 Drinks International 2025 ou 2026 |

**Maisons retenues :** Louis Roederer, Krug, Pol Roger, Billecart-Salmon, Charles Heidsieck, Dom Pérignon, Ruinart, Taittinger, Laurent-Perrier.

**Maisons exclues et pourquoi :**
- Moët & Chandon, Veuve Clicquot : positionnement volume/mainstream, prix d'entrée < 40€
- Armand de Brignac, Telmont : trop niche ou en déclin de classement
- Gosset, Philipponnat : présence internationale plus limitée

---

## 3. Traitement des données manquantes (N/D)

Conformément aux exigences du brief, chaque donnée non disponible est signalée avec :
1. **La raison** de l'indisponibilité
2. **Une méthode concrète** pour l'obtenir

| Donnée N/D | Raison | Méthode proposée |
|------------|--------|-----------------|
| Volume exact Bollinger (btl/an) | Maison indépendante non cotée, pas de publication | Demande directe à la maison ou estimation via Union des Maisons de Champagne |
| CA Bollinger | Non public (comptes non déposés publiquement) | Rapport annuel Groupe Bollinger (demande directe) |
| Part de marché Bollinger | Données propriétaires IWSR/Euromonitor | Abonnement IWSR Drinks Market Analysis |
| Taux d'engagement Instagram | Données non publiques | Phlanx.com, Sprout Social, ou Brandwatch |
| Followers Instagram Krug/Ruinart/Pol Roger | Comptes non identifiés avec certitude | Vérification manuelle + SimilarWeb |
| Budget marketing Bollinger | Non public | Estimation Kantar AdIntel (dépenses publicitaires mesurées) |
| Part de voix médias (%) | Données propriétaires Meltwater/Cision | Abonnement Meltwater ou Cision |

---

## 4. Fiabilité et limites des données

### Points forts
- Toutes les données factuelles sont sourcées avec lien et date de publication
- Les sources primaires utilisées sont reconnues dans le secteur (Drinks International, Comité Champagne, Bloomberg, The Drinks Business)
- Le classement Most Admired est basé sur un jury professionnel (sommeliers, MW, journalistes)

### Limites à noter
- **Données Bollinger spécifiques** : la maison étant indépendante et non cotée, les données financières précises (CA, volumes exacts, marges) ne sont pas publiques
- **Données sociales** : les chiffres Instagram sont des snapshots au moment de la collecte (mars 2026) et peuvent évoluer rapidement
- **Prix** : les fourchettes de prix sont indicatives (Wine-Searcher, cavistes en ligne) et peuvent varier selon les marchés et les millésimes
- **Tarifs US** : situation évolutive, les données Bloomberg (fév. 2026) reflètent la situation à cette date

---

## 5. Log des 18 sources utilisées

| ID | Source | Type | Date | URL |
|----|--------|------|------|-----|
| S1 | Comité Champagne / The Finest Bubble | Marché | Jan. 2026 | https://thefinestbubble.com/news-and-reviews/champagne-shipments-fall-again-for-third-successive-year-down-2-in-2025/ |
| S2 | Drinks International / Wine Intelligence | Classement | Mars 2026 | https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again |
| S3 | The Finest Bubble | Classement | Mars 2025 | https://thefinestbubble.com/news-and-reviews/the-worlds-most-admired-champagne-brands-2025-drinks-international-report/ |
| S4 | Forbes | Presse | Fév. 2025 | https://www.forbes.com/sites/johnkell/2025/02/14/how-bollinger-is-finding-ways-to-celebrate-as-champagne-sales-soften/ |
| S5 | The Drinks Business | Marché | Mars 2025 | https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/ |
| S6 | Aston Martin | Partenariat | Sept. 2025 | https://www.astonmartin.com/en-us/our-world/news/2025/9/29/two-icons-unite-aston-martin-and-champagne-bollinger-announce-prestigious-new-global-partnership |
| S7 | Bloomberg | Risque | Fév. 2026 | https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs |
| S8 | Drinks International | Institutionnel | Déc. 2024 | https://drinksint.com/news/fullstory.php/aid/11530/Bollinger_renews_Royal_Warrant.html |
| S9 | Bollinger.com | ESG | Sept. 2023 | https://www.champagne-bollinger.com/en/bcorp/ |
| S10 | Champagne Club | Risque | Mars 2024 | https://www.champagneclub.com/champagnes-rare-jewel-at-risk-of-extinction/ |
| S11 | Wine-Searcher | Prix | Mars 2026 | https://www.wine-searcher.com/find/bollinger |
| S12 | PR Newswire | Produit | Oct. 2025 | https://www.prnewswire.com/news-releases/champagne-bollinger-to-launch-a-new-special-cuvee-007-limited-edition-celebrating-over-45-years-as-the-official-champagne-of-james-bond-302573009.html |
| S13 | Drinks International | Réputation | Oct. 2025 | https://drinksint.com/news/fullstory.php/aid/12032/Bollinger_threatens_English_wine_brand_over__Bollie__ad.html |
| S14 | DataBridge Market Research | Marché | 2024 | https://www.databridgemarketresearch.com/reports/global-champagne-market |
| S15 | Fortune Business Insights | Marché | Fév. 2026 | https://www.fortunebusinessinsights.com/champagne-market-112162 |
| S16 | Vinetur | Classement | Mars 2026 | https://www.vinetur.com/en/2026031097315/louis-roederer-krug-and-bollinger-secure-top-spots-in-2026-most-admired-champagne-brands-ranking.html |
| S17 | Instagram @champagne_bollinger | Digital | Mars 2026 | https://www.instagram.com/champagne_bollinger/ |
| S18 | Instagram @domperignonofficial | Digital | Mars 2026 | https://www.instagram.com/domperignonofficial/ |

---

*Note : Ce dashboard a été produit dans un contexte de recherche et d'analyse compétitive. Les données sont issues de sources publiques et reflètent l'état du marché au moment de leur publication. Pour une utilisation décisionnelle, il est recommandé de croiser ces informations avec des sources propriétaires (IWSR, Euromonitor, Meltwater).*
