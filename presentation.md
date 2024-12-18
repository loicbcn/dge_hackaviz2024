---
puppeteer:
    displayHeaderFooter: false
    margin:
      top: '5mm'
      right: '5mm'
      bottom: '5mm'
      left: '5mm'
---

<style>
#container { font-family: "Segoe Script"}
.signature_ddt31 { font-family: Marianne } 
table.sddt31[empty-cells],table.sddt31[border="0"],table.sddt31[border="0"] > tr > td, table.sddt31[border="0"] > tr > th,table.sddt31[border="0"] > thead > tr > td, table.sddt31[border="0"] > tbody > tr > td, table.sddt31[border="0"] > tfoot > tr > td,table.sddt31[border="0"] > thead > tr > th, table.sddt31[border="0"] > tbody > tr > th, table.sddt31[border="0"] > tfoot > tr > th,table.sddt31:not([border]),table.sddt31:not([border]) > tr > td, table.sddt31:not([border]) > tr >  th,table.sddt31:not([border]) > thead > tr > td, table.sddt31:not([border]) > tbody > tr > td, table.sddt31:not([border]) > tfoot > tr > td,table.sddt31:not([border]) > thead > tr > th, table.sddt31:not([border]) > tbody > tr > th, table.sddt31:not([border]) > tfoot > tr > th{border: none !important;}#graph { width:42px; height:30px; font-size:0; padding:0; margin:0 15px 0 0;}#graph:hover div {    height:27px !important;    transition: height 0.25s ease-in;}</style>

<div id="container">

### Présentation

<div style ="display:flex; justify-content: space-around; align-items:center;">

<div class="signature_ddt31" style='margin:0; padding:0; font-size:14px; font-family: Marianne !important, Arial, Helvetica, "Liberation Sans", FreeSans, sans-serif; color:#000000;'>
	<div>
		<strong style="color:#000000; font-size:13px;">Loïc Donot</strong>
	</div>
	<div>
		<strong style="font-size:11px;color:#000000">Développeur chargé de la valorisation des données</strong>
	</div>
	<table style="border-collapse:collapse;border:none;margin: 10px 0 0 0;">
		<tr>
			<td>
				<table class="sddt31" id="graph" style="border-collapse:collapse;border:none;width:42px; height:30px; font-size:0; padding:0; margin:0 10px 0 0;">
					<tr>
						<td valign="bottom" style="border-left:1px solid #666 !important;border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:18px;background-color:#ff7f7f; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
						<td valign="bottom" style="border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:27px;background-color:#ffbb33; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
						<td valign="bottom" style="border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:12px;background-color:#99cc00; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
						<td valign="bottom" style="border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:13px;background-color:#aa66cc; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
						<td valign="bottom" style="border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:24px;background-color:#33b5e5; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
						<td valign="bottom" style="border-bottom:1px solid #666 !important; width:7px; padding:1px;">
							<div style="height:14px;background-color:#ff3298; transition: height 0.25s ease-in;">&nbsp;</div>
						</td>
					</tr>
				</table>
			</td>
			<td valign="middle">
				<strong style="font-size:11px;color:#000000">Mission Innovation et Partenariats</strong>
				<br>
				<strong style="font-size:11px;color:#000000">Gestion technique de la donnée</strong>
			</td>
		</tr>
	</table>
		<div style="margin-top:10px; line-height:16px">
			<span style="font-size:12px;color:#000000;font-weight:bold">Direction départementale des territoires de la Haute-Garonne</span>
        </div>
</div>
    <img src="imgs/winner.svg" style="max-width:15%;">
</div>

### Visualisation 

**#1** 

Il s'agit d'une page web composée de 3 représentations graphiques commentées.
Le degré d'urbanisation des EPCI (attribut `forme`) est mis en avant dans chacun des graphiques.

<img src="imgs/chart1.png">

La première, sous forme de flux, tente de montrer, ou sont produites et consommées les EnR (bienque les données ne permettent pas de distinguer la part d'EnR consommée).
Elle expose dans sa partie gauche
- la répartition des quantités d'EnR produites par filière
- leurs destinations de consommation (carburant, électricité, chaleur) sur 4 ans. 

La partie droite représente les consommations d'énergie par poste (Pétrole, gaz ...). 

Production et consommation sont séparés par un bloc "forme d'EPCI" (Urbain, rural périurbain et rural autonome) qui permet de distinguer 
- ou sont produites les EnR, et 
- ou sont consommées les énergies.

<img src="imgs/chart1_2.png" style="float:left; width:50%; margin: 0 5mm 5mm 0">

En survolant avec la souris les éléments du graphique, une infobulle précise la quantité d'énergie produite ou consommée et le pourcentage d'énergie de l'élément par rapport aux éléments de la même colonne. 
<div style="clear:both;">

En regardant le graphique dans son ensemble, le déséquilibre entre production d'EnR et consommation globale d'énergie apparaît.

<!-- pagebreak -->

**#2** 
 La deuxième représentation, sous forme de barres, expose les évolutions par année et toujours par **degré d'urbanisation** de la production d'EnR, de la consommation d'énergie et du ratio EnR. !!! Les données de consommations, très supérieures à celles de production, sont représentées à une échelle plus petite.

Ce graphique, qui comporte 3 axes Y, donne beaucoup d'informations, mais nécessite un minimum d'attention.
<img src="imgs/chart2.png">

**#3** 
Le troisième graphique exprime, pour chaque EPCI en 2022, le rapport entre la population et le ratio EnR. On retrouve les mêmes couleurs que précédemment pour signaler le degré d'urbanisation. Un zoom sur la partie la plus dense du graphique permet d'y voir plus clair.

<img src="imgs/chart3.png">

Cette représentation met en avant un meilleur ratio EnR dans les zones moins peuplées.
51% des EnR sont produites dans des zones peuplées de 32% de la population.

</div>


### Processus de création

**#1 Examen des données et choix de l'axe de travail**
- Avec l'aide de la documentation fournie, j'essaie de comprendre ce que ces données décrivent.
Je ne suis pas spécialiste de la thématique, **il faudra éviter un hors sujet**.

- je fais des requêtes sur les données ... **DuckDB** est un super outil pour consulter en SQL des données à plat (fichiers), même géographiques.




- J'affiche les données sous **QGIS**, en tentant de trouver des logiques géographiques aux données.
<img src="imgs/map_explore.png">


- J'essaie de trouver un point de vue qui me parle, une cause à défendre et avec de la chance, un truc marrant à dire ... VEnR, EnRVent ... 
-> Je décide d'axer la présentation sur le **degré d'urbanisation** des EPCI, en espérant montrer que les petits nourrissent les grands ... Bon, c'est pas si simple.

- Je relis bien la doc pour éviter des écueils du style 
    - production et consommation ne sont pas exprimées dans la même unité
    - La consommation d'énergie est globale, pas seulement EnR.

Bref, tous ces petits pièges vicieux qu'affectionnent en général les organisateurs de concours.


**#2 Choix technologique et réalisation**

Je savais dès le départ que je voulais réaliser une visualisation sous forme de page web.

Je travaille souvent avec la librairie **Highcharts.js** qui permet de réaliser beaucoup de types de graphiques différents, jolis, dynamiques et très personnalisables ... Gratuite pour des utilisations non lucratives.

Cela faisait un moment que je voulais faire un graphique de type **sankey**, et là, il y a matière à montrer le flux des EnR, depuis leur production (champ `détail`), en passant par ce en quoi elles sont utilisées (`vecteur`), puis par qui les utilisent (`forme`), et enfin, leur dilution dans la consommation globale.

Pour conforter le propos, j'ai réalisé 2 autres graphiques plus classiques, avec la même librairie.

**Concernant la mise en page**, le framework css **Bootstrap** offre des composants facilitant le positionnement de blocks responsives.

J'ai quand même dû personnaliser le style de la page pour permettre une impression correcte sur 3 pages A4.