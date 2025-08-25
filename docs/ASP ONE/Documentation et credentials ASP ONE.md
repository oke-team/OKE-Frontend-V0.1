REST API VERSION 26/06/2025
Date Commentaire
11/09/2024 Initial version
21/10/2024 Adding Archive module
02/01/2025 Adding Digital Vault module
26/06/2025 Adding v2 for sent / received declarations search in order to return teleprocedure specific results (v1 is deprecated but remains available)
Adding Alert / Notification module to view / search profiles
L’API SOAP est remplacée par l’API REST sortie fin 2024
Nous devons utiliser REST mais la doc SOAP reste utile pour comprendre le fonctionnement du service.
Notre portail OKÉ.PRO est maintenant disponible en PRODUCTION : https://declaration.oke.pro/
## Voici les identifiants de notre compte de TEST :

**1. Identifiant**

- _Id_ : 151982

**2. Utilisateur**

- _Login_ : oke_test1

**3. Statut de test**

- _Test_ : ● (indique qu’il s’agit d’un compte de test)

**4. Type**

- _Type_ : Tiers-Déclarant

**5. Identité de l’entreprise**

- _N° SIRET_ : 07955542100019  
- _Raison Sociale_ : OKÉ SOFTWARE SOLUTION (TEST)

**6. État**

- _Statut_ : Ouvert

**7. Plateforme**

- _Portail_ : OKE

**8. Date d’inscription**

- _Inscription_ : 22/04/25

---

**Login** : `oke_test1`  
**Mot de passe du compte de TEST** : `3nm56se!G3PE`
|                                 |                                                                                                  |                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------- |
| **Environnement de PRODUCTION** |                                                                                                  |                       |
| **Type**                        | **Login**                                                                                        | **Password**          |
| SALT SSO                        | E5YTf7Uk8zz5mA5j9UkeX9nq45L6RA                                                                   |                       |
| Compte administrateur           | okeMaster                                                                                        | mb94p#tAvTPBJ8R!Q797d |
|                                 |                                                                                                  |                       |
| **Portail :**                   | https://declaration.oke.pro                                                                      |                       |
|                                 |                                                                                                  |                       |
| **Messagerie**                  |                                                                                                  |                       |
| POP3S :                         | pop.declaration.oke.pro / SSL/TLS port 995 / Password authentication                             |                       |
| SMTPS :                         | mail.declaration.oke.pro / SSL/TLS port 465 ou STARTTLS ports 25 / 587 / Password authentication |                       |
|                                 |                                                                                                  |                       |
| **Boites de dépôt mail :**      |                                                                                                  |                       |
| TVA                             | edi-tva@declaration.oke.pro                                                                      |                       |
| TDFC                            | edi-tdfc@declaration.oke.pro                                                                     |                       |
|                                 |                                                                                                  |                       |
| **API REST :**                  |                                                                                                  |                       |
| Swagger                         | https://declaration.oke.pro/api/rest/swagger/index.html                                          |                       |
| Documentation                   | https://www.aspone.fr/files/webservices/api_rest_presentation.pdf                                |                       |
|                                 |                                                                                                  |                       |
|                                                                                                                     |                                                                                                          |                       |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| **Environnement de RECETTE**                                                                                        |                                                                                                          |                       |
| _Dans cette environnement, tous les comptes sont des comptes de TEST, les flux sont automatiquement forcés en TEST_ |                                                                                                          |                       |
| **Type**                                                                                                            | **Login**                                                                                                | **Password**          |
| SALT SSO                                                                                                            | 87yf7aP8wBGkM6vCDwE6D6f8xL37Gj                                                                           |                       |
| Compte administrateur                                                                                               | okeMaster                                                                                                | 6Z%72ait7V6K!Mt2ed4HF |
| Compte primaire                                                                                                     | oke_test                                                                                                 | fvA%76H7wS2G          |
|                                                                                                                     |                                                                                                          |                       |
| **Portail :**                                                                                                       | https://recette-oke.tessitechno.fr                                                                       |                       |
|                                                                                                                     |                                                                                                          |                       |
| **Messagerie**                                                                                                      |                                                                                                          |                       |
| POP3S :                                                                                                             | pop.recette.declaration.oke.pro / SSL/TLS port 995 / Password authentication                             |                       |
| SMTPS :                                                                                                             | mail.recette.declaration.oke.pro / SSL/TLS port 465 ou STARTTLS ports 25 / 587 / Password authentication |                       |
|                                                                                                                     |                                                                                                          |                       |
| **Boites de dépôt mail :**                                                                                          |                                                                                                          |                       |
| TVA                                                                                                                 | edi-tva@recette.declaration.oke.pro                                                                      |                       |
| TDFC                                                                                                                | edi-tdfc@recette.declaration.oke.pro                                                                     |                       |
|                                                                                                                     |                                                                                                          |                       |
| **API REST :**                                                                                                      |                                                                                                          |                       |
| Swagger                                                                                                             | https://recette-oke.tessitechno.fr/api/rest/swagger/index.html                                           |                       |
| Documentation                                                                                                       | https://www.aspone.fr/files/webservices/api_rest_presentation.pdf                                        |                       |
|                                                                                                                     |                                                                                                          |                       |
Mail de confirmation d'ouverture de service par ASPONE :
## ✅ Portail OKÉ.PRO – Accès RECETTE

**Nous avons le plaisir de vous informer que votre portail OKÉ.PRO de RECETTE est maintenant disponible :**

- **Portail WEB** : [https://recette-oke.tessitechno.fr](https://recette-oke.tessitechno.fr)
- **API REST** : [https://recette-oke.tessitechno.fr/api/rest/swagger/index.html](https://recette-oke.tessitechno.fr/api/rest/swagger/index.html)

> ⚠️ Tous les flux qui transitent par ce portail sont automatiquement forcés en TEST.

---

### 📎 Vous trouverez en pièces jointes toutes les informations nécessaires pour initier vos développements et vos tests sur le portail de RECETTE :

- URL et identifiants
- Configuration DNS
- Mise en place du SSO
- Import des comptes par CSV (ou via l’API)

---

## 🔄 Demande de migration

**Pouvez-vous nous confirmer que nous devons migrer les 3 comptes « noecompta » de TEST ci-dessous sur votre portail OKÉ.PRO de RECETTE**  
_(ils sont actuellement rattachés au portail ASPOne de RECETTE) :_

---

### 1. Enregistrement 1

- **Id** : 62065  
- **Login** : noecomptaws  
- **Test** : ● (oui)  
- **Type** : Entreprise  
- **N° SIRET** : 32940521100304  
- **Raison Sociale** : Test Raison Sociale  
- **Statut** : Demande validée  
- **Portail** : ASPONE  
- **Inscription** : 22/08/24  

---

### 2. Enregistrement 2

- **Id** : 62064  
- **Login** : noecomptatest  
- **Test** : ● (oui)  
- **Type** : Entreprise  
- **N° SIRET** : 32940521100304  
- **Raison Sociale** : Test Raison Sociale  
- **Statut** : Demande validée  
- **Portail** : ASPONE  
- **Inscription** : 22/08/24  

---

### 3. Enregistrement 3

- **Id** : 62044  
- **Login** : noecompta_test  
- **Test** : ● (oui)  
- **Type** : Tiers-Déclarant  
- **N° SIRET** : 80184079400037  
- **Raison Sociale** : NOE (TEST RECETTE)  
- **Statut** : Ouvert  
- **Portail** : ASPONE  
- **Inscription** : 16/08/24  

---

## 📚 API REST – Création de comptes

Notre API REST est assez récente. Nous allons prévoir d’étoffer la documentation concernant la **création / modification des comptes**.

> 📎 En attendant, vous trouverez en **pièce jointe** :
> - un **exemple de JSON pour créer un compte primaire**
> - un **exemple de JSON pour créer un compte secondaire**

❗ Si vous valorisez l’attribut `portal` à `"impots.gouv.fr"` dans votre JSON, il faut en réalité utiliser `"OKE"` (code de la marque blanche).

---

## 🔗 Liens utiles – Documentations techniques

- **Traducteur XML-Edi** :  
  [https://www.aspone.fr/files/tutoriaux/xmledi/Documentation_XML-EDI.zip](https://www.aspone.fr/files/tutoriaux/xmledi/Documentation_XML-EDI.zip)

- **Documentation relative à nos API/Webservices « UpV@lue »** :  
  [https://www.aspone.fr/index.php/documentation](https://www.aspone.fr/index.php/documentation)

> ℹ️ Les APIs SOAP sont en cours de migration vers REST.  
> Mise à disposition en **test courant octobre** et en **production en décembre**.

---

## ⚙️ Webservices UpValue

Je vous recommande de valider le fonctionnement via **SOAPUI** (client universel gratuit) :  
📄 [https://www.aspone.fr/files/webservices/demo_webservices.pdf](https://www.aspone.fr/files/webservices/demo_webservices.pdf)

- 📌 Le paramétrage est détaillé à partir de la **page 23**.
- 🧠 Les bonnes pratiques pour le suivi de dépôts figurent **page 9** :
  - 👉 privilégier le suivi **par identifiant** (meilleures performances).

---

## 🔐 Sécurité des Webservices

- WS-Security pour l’authentification SOAP :  
  [http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0.pdf](http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0.pdf)

- Dépôt de fichiers via XOP/MTOM :  
  [https://www.ibm.com/docs/en/cics-ts/5.1?topic=data-mtomxop-soap](https://www.ibm.com/docs/en/cics-ts/5.1?topic=data-mtomxop-soap)

- 🔠 Encodage attendu des fichiers : **ISO 8859-15**

---

## 👥 Support technique

Pour toute question liée à l’implémentation de nos solutions (XML-Edi ou Webservices),  
vous pouvez désormais contacter :

- **Thomas BRUN**  
- **Pierre RONZY**  
_(contacts mentionnés en copie du message initial)_

FONCTIONNEMENT DE WEBSERVICES UPVALUE
# SOMMAIRE

## 01/ Présentation Fonctionnelle

- WS Deposit = Dépôt de fichiers  
- WS Monitoring = Suivi des flux  
- WS Registering = Inscription de comptes  
- WS Alert = Paramétrage notifications mails d’alerte  

## 02/ Tests avec SoapUI

- Comment paramétrer le client Webservice universel SOAPUI pour tester nos webservices  

## 03/ Astuces SoapUI

- Fonctionnalités avancées de SOAPUI  

## 04/ Annexes

01/ PRÉSENTATION FONCTIONNELLE
## 📘 Présentation Fonctionnelle

☑️ **Environnement cible des tests = RECETTE**

### 3 Webservices permettent d’interagir pleinement avec le portail :

- **Dépôt** : [https://services-teleprocedures.aspone.fr/wspreprod/deposit?wsdl](https://services-teleprocedures.aspone.fr/wspreprod/deposit?wsdl)
<wsdl:definitions xmlns:soapenc11="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://aspone.fr/mb/webservices" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc12="http://www.w3.org/2003/05/soap-encoding" targetNamespace="http://aspone.fr/mb/webservices">
<wsdl:types>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://aspone.fr/mb/webservices">
<xsd:include schemaLocation="https://services-teleprocedures.aspone.fr/wspreprod/schema/common/DepositWS.xsd"/>
<xsd:element name="data" type="xsd:base64Binary"/>
<xsd:element name="subject" type="xsd:string"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="addDocumentResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="translateDocumentResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="addWebdeclarationResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="translateDocumentRequest">
<wsdl:part name="translateDocumentParams" element="tns:translateDocumentParams"> </wsdl:part>
<wsdl:part name="data" element="tns:data"> </wsdl:part>
</wsdl:message>
<wsdl:message name="translateDocumentRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="addWebdeclarationRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="addDocumentRequest">
<wsdl:part name="subject" element="tns:subject"> </wsdl:part>
<wsdl:part name="teleProcedure" element="tns:teleProcedure"> </wsdl:part>
<wsdl:part name="data" element="tns:data"> </wsdl:part>
</wsdl:message>
<wsdl:message name="addDocumentRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="addWebdeclarationRequest">
<wsdl:part name="addWebdeclarationParams" element="tns:addWebdeclarationParams"> </wsdl:part>
<wsdl:part name="data" element="tns:data"> </wsdl:part>
</wsdl:message>
<wsdl:portType name="DepositWebServicePortType">
<wsdl:operation name="addWebdeclaration">
<wsdl:input name="addWebdeclarationRequest" message="tns:addWebdeclarationRequest"> </wsdl:input>
<wsdl:output name="addWebdeclarationResponse" message="tns:addWebdeclarationResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="addDocument">
<wsdl:input name="addDocumentRequest" message="tns:addDocumentRequest"> </wsdl:input>
<wsdl:output name="addDocumentResponse" message="tns:addDocumentResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="translateDocument">
<wsdl:input name="translateDocumentRequest" message="tns:translateDocumentRequest"> </wsdl:input>
<wsdl:output name="translateDocumentResponse" message="tns:translateDocumentResponse"> </wsdl:output>
</wsdl:operation>
</wsdl:portType>
<wsdl:binding name="DepositWebServiceHttpBinding" type="tns:DepositWebServicePortType">
<wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="addWebdeclaration">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="addWebdeclarationRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:addWebdeclarationRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:addWebdeclarationRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="addWebdeclarationResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="addDocument">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="addDocumentRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:addDocumentRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:addDocumentRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="addDocumentResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="translateDocument">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="translateDocumentRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:translateDocumentRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:translateDocumentRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="translateDocumentResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="DepositWebService">
<wsdl:port name="DepositWebServiceHttpPort" binding="tns:DepositWebServiceHttpBinding">
<wsdlsoap:address location="https://services-teleprocedures.aspone.fr/wspreprod/deposit"/>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>

- **Suivi** : [https://services-teleprocedures.aspone.fr/wspreprod/monitoring?wsdl](https://services-teleprocedures.aspone.fr/wspreprod/monitoring?wsdl)
<wsdl:definitions xmlns:soapenc11="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://aspone.fr/mb/webservices" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc12="http://www.w3.org/2003/05/soap-encoding" targetNamespace="http://aspone.fr/mb/webservices">
<wsdl:types>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://aspone.fr/mb/webservices">
<xsd:include schemaLocation="https://services-teleprocedures.aspone.fr/wspreprod/schema/common/MonitoringWS.xsd"/>
<xsd:element name="recipientReportId" type="xsd:int"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="interchangeSearchRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReports_v2RequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarationDetailsRequest">
<wsdl:part name="declarationId" element="tns:declarationId"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getResponseOgaDocumentByIdRequest">
<wsdl:part name="getResponseOgaDocumentByIdCriteria" element="tns:getResponseOgaDocumentByIdCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="declarationSearchRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangesByDepositIDResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangeByWebdeclarationIdRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getResponseOgaDocumentByIdRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheParametrageDSNFilesRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarativeCertificateRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportByIdResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="findAuthorizedAccountsForMonitoringResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="receptionSearchRequest">
<wsdl:part name="receptionSearchCriteria" element="tns:receptionSearchCriteria"> </wsdl:part>
<wsdl:part name="receptionSearchPagination" element="tns:receptionSearchPagination"> </wsdl:part>
</wsdl:message>
<wsdl:message name="receptionSearchRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="recipientReportSearchRequest">
<wsdl:part name="recipientReportSearchCriteria" element="tns:recipientReportSearchCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportsResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="interchangeSearchResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheParametrageDSNFilesRequest">
<wsdl:part name="ficheParametrageDSNFileSearchCriteria" element="tns:ficheParametrageDSNFileSearchCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="recipientReportSearchResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangesByDepositIDRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="receptionSearchResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangeByWebdeclarationIdResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReports_v2Response">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getXmlFilesRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarationDetailsResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReports_v2Request">
<wsdl:part name="getRecipientReportsSearchCriteria_v2" element="tns:getRecipientReportsSearchCriteria_v2"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheBpijDSNFilesRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheBpijDSNFilesRequest">
<wsdl:part name="ficheBpijDSNFileSearchCriteria" element="tns:ficheBpijDSNFileSearchCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportsRequest">
<wsdl:part name="declarationId" element="tns:declarationId"> </wsdl:part>
<wsdl:part name="zip" element="tns:zip"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getEdiFilesRequest">
<wsdl:part name="ediFileSearchCriteria" element="tns:ediFileSearchCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getResponseOgaDocumentByIdResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarationDetailsRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="findAuthorizedAccountsForMonitoringRequest"> </wsdl:message>
<wsdl:message name="getXmlFilesRequest">
<wsdl:part name="xmlFileSearchCriteria" element="tns:xmlFileSearchCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="recipientReportSearchRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportByIdRequest">
<wsdl:part name="recipientReportId" element="tns:recipientReportId"> </wsdl:part>
<wsdl:part name="zip" element="tns:zip"> </wsdl:part>
</wsdl:message>
<wsdl:message name="declarationSearchRequest">
<wsdl:part name="declarationSearchCriteria" element="tns:declarationSearchCriteria"> </wsdl:part>
<wsdl:part name="declarationSearchPagination" element="tns:declarationSearchPagination"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportByIdRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangesByDepositIDRequest">
<wsdl:part name="depositId" element="tns:depositId"> </wsdl:part>
<wsdl:part name="getInterchangesByDepositIDPagination" element="tns:getInterchangesByDepositIDPagination"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheParametrageDSNFilesResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getFicheBpijDSNFilesResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="findAuthorizedAccountsForMonitoringRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getRecipientReportsRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="declarationSearchResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getXmlFilesResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getEdiFilesResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarativeCertificateRequest">
<wsdl:part name="getDeclarativeCertificateCriteria" element="tns:getDeclarativeCertificateCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getInterchangeByWebdeclarationIdRequest">
<wsdl:part name="getInterchangeByWebdeclarationIdCriteria" element="tns:getInterchangeByWebdeclarationIdCriteria"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getEdiFilesRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getDeclarativeCertificateResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="interchangeSearchRequest">
<wsdl:part name="interchangeSearchCriteria" element="tns:interchangeSearchCriteria"> </wsdl:part>
<wsdl:part name="interchangeSearchPagination" element="tns:interchangeSearchPagination"> </wsdl:part>
</wsdl:message>
<wsdl:portType name="MonitoringWebServicePortType">
<wsdl:operation name="getInterchangesByDepositID">
<wsdl:input name="getInterchangesByDepositIDRequest" message="tns:getInterchangesByDepositIDRequest"> </wsdl:input>
<wsdl:output name="getInterchangesByDepositIDResponse" message="tns:getInterchangesByDepositIDResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="declarationSearch">
<wsdl:input name="declarationSearchRequest" message="tns:declarationSearchRequest"> </wsdl:input>
<wsdl:output name="declarationSearchResponse" message="tns:declarationSearchResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getInterchangeByWebdeclarationId">
<wsdl:input name="getInterchangeByWebdeclarationIdRequest" message="tns:getInterchangeByWebdeclarationIdRequest"> </wsdl:input>
<wsdl:output name="getInterchangeByWebdeclarationIdResponse" message="tns:getInterchangeByWebdeclarationIdResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReportById">
<wsdl:input name="getRecipientReportByIdRequest" message="tns:getRecipientReportByIdRequest"> </wsdl:input>
<wsdl:output name="getRecipientReportByIdResponse" message="tns:getRecipientReportByIdResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReports_v2">
<wsdl:input name="getRecipientReports_v2Request" message="tns:getRecipientReports_v2Request"> </wsdl:input>
<wsdl:output name="getRecipientReports_v2Response" message="tns:getRecipientReports_v2Response"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="findAuthorizedAccountsForMonitoring">
<wsdl:input name="findAuthorizedAccountsForMonitoringRequest" message="tns:findAuthorizedAccountsForMonitoringRequest"> </wsdl:input>
<wsdl:output name="findAuthorizedAccountsForMonitoringResponse" message="tns:findAuthorizedAccountsForMonitoringResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getFicheParametrageDSNFiles">
<wsdl:input name="getFicheParametrageDSNFilesRequest" message="tns:getFicheParametrageDSNFilesRequest"> </wsdl:input>
<wsdl:output name="getFicheParametrageDSNFilesResponse" message="tns:getFicheParametrageDSNFilesResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getFicheBpijDSNFiles">
<wsdl:input name="getFicheBpijDSNFilesRequest" message="tns:getFicheBpijDSNFilesRequest"> </wsdl:input>
<wsdl:output name="getFicheBpijDSNFilesResponse" message="tns:getFicheBpijDSNFilesResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getResponseOgaDocumentById">
<wsdl:input name="getResponseOgaDocumentByIdRequest" message="tns:getResponseOgaDocumentByIdRequest"> </wsdl:input>
<wsdl:output name="getResponseOgaDocumentByIdResponse" message="tns:getResponseOgaDocumentByIdResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="recipientReportSearch">
<wsdl:input name="recipientReportSearchRequest" message="tns:recipientReportSearchRequest"> </wsdl:input>
<wsdl:output name="recipientReportSearchResponse" message="tns:recipientReportSearchResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getDeclarativeCertificate">
<wsdl:input name="getDeclarativeCertificateRequest" message="tns:getDeclarativeCertificateRequest"> </wsdl:input>
<wsdl:output name="getDeclarativeCertificateResponse" message="tns:getDeclarativeCertificateResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getXmlFiles">
<wsdl:input name="getXmlFilesRequest" message="tns:getXmlFilesRequest"> </wsdl:input>
<wsdl:output name="getXmlFilesResponse" message="tns:getXmlFilesResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getDeclarationDetails">
<wsdl:input name="getDeclarationDetailsRequest" message="tns:getDeclarationDetailsRequest"> </wsdl:input>
<wsdl:output name="getDeclarationDetailsResponse" message="tns:getDeclarationDetailsResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="interchangeSearch">
<wsdl:input name="interchangeSearchRequest" message="tns:interchangeSearchRequest"> </wsdl:input>
<wsdl:output name="interchangeSearchResponse" message="tns:interchangeSearchResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="receptionSearch">
<wsdl:input name="receptionSearchRequest" message="tns:receptionSearchRequest"> </wsdl:input>
<wsdl:output name="receptionSearchResponse" message="tns:receptionSearchResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getEdiFiles">
<wsdl:input name="getEdiFilesRequest" message="tns:getEdiFilesRequest"> </wsdl:input>
<wsdl:output name="getEdiFilesResponse" message="tns:getEdiFilesResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReports">
<wsdl:input name="getRecipientReportsRequest" message="tns:getRecipientReportsRequest"> </wsdl:input>
<wsdl:output name="getRecipientReportsResponse" message="tns:getRecipientReportsResponse"> </wsdl:output>
</wsdl:operation>
</wsdl:portType>
<wsdl:binding name="MonitoringWebServiceHttpBinding" type="tns:MonitoringWebServicePortType">
<wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="getInterchangesByDepositID">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getInterchangesByDepositIDRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getInterchangesByDepositIDRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getInterchangesByDepositIDRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getInterchangesByDepositIDResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="declarationSearch">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="declarationSearchRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:declarationSearchRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:declarationSearchRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="declarationSearchResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getInterchangeByWebdeclarationId">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getInterchangeByWebdeclarationIdRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getInterchangeByWebdeclarationIdRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getInterchangeByWebdeclarationIdRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getInterchangeByWebdeclarationIdResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReportById">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getRecipientReportByIdRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getRecipientReportByIdRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getRecipientReportByIdRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getRecipientReportByIdResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReports_v2">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getRecipientReports_v2Request">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getRecipientReports_v2RequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getRecipientReports_v2RequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getRecipientReports_v2Response">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="findAuthorizedAccountsForMonitoring">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="findAuthorizedAccountsForMonitoringRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:findAuthorizedAccountsForMonitoringRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:findAuthorizedAccountsForMonitoringRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="findAuthorizedAccountsForMonitoringResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getFicheParametrageDSNFiles">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getFicheParametrageDSNFilesRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getFicheParametrageDSNFilesRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getFicheParametrageDSNFilesRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getFicheParametrageDSNFilesResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getFicheBpijDSNFiles">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getFicheBpijDSNFilesRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getFicheBpijDSNFilesRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getFicheBpijDSNFilesRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getFicheBpijDSNFilesResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getResponseOgaDocumentById">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getResponseOgaDocumentByIdRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getResponseOgaDocumentByIdRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getResponseOgaDocumentByIdRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getResponseOgaDocumentByIdResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="recipientReportSearch">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="recipientReportSearchRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:recipientReportSearchRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:recipientReportSearchRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="recipientReportSearchResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getDeclarativeCertificate">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getDeclarativeCertificateRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getDeclarativeCertificateRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getDeclarativeCertificateRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getDeclarativeCertificateResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getXmlFiles">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getXmlFilesRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getXmlFilesRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getXmlFilesRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getXmlFilesResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getDeclarationDetails">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getDeclarationDetailsRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getDeclarationDetailsRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getDeclarationDetailsRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getDeclarationDetailsResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="interchangeSearch">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="interchangeSearchRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:interchangeSearchRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:interchangeSearchRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="interchangeSearchResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="receptionSearch">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="receptionSearchRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:receptionSearchRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:receptionSearchRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="receptionSearchResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getEdiFiles">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getEdiFilesRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getEdiFilesRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getEdiFilesRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getEdiFilesResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getRecipientReports">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getRecipientReportsRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getRecipientReportsRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getRecipientReportsRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getRecipientReportsResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="MonitoringWebService">
<wsdl:port name="MonitoringWebServiceHttpPort" binding="tns:MonitoringWebServiceHttpBinding">
<wsdlsoap:address location="https://services-teleprocedures.aspone.fr/wspreprod/monitoring"/>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>

- **Inscription** : [https://services-teleprocedures.aspone.fr/wspreprod/registering?wsdl](https://services-teleprocedures.aspone.fr/wspreprod/registering?wsdl)
<wsdl:definitions xmlns:soapenc11="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://aspone.fr/mb/webservices" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc12="http://www.w3.org/2003/05/soap-encoding" targetNamespace="http://aspone.fr/mb/webservices">
<wsdl:types>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://aspone.fr/mb/webservices">
<xsd:include schemaLocation="https://services-teleprocedures.aspone.fr/wspreprod/schema/common/RegisteringWS.xsd"/>
<xsd:element name="accountName" type="xsd:string"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="modifyPrimaryAccountRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifySecondaryAccountResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerPrimaryAccountRequest">
<wsdl:part name="primaryAccount" element="tns:primaryAccount"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getAccountStateRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyPrimaryAccountResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyAccountStateRequest">
<wsdl:part name="accountStateModifications" element="tns:accountStateModifications"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyPrimaryAccountRequest">
<wsdl:part name="primaryAccountModifications" element="tns:primaryAccountModifications"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerSecondaryAccountRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerSecondaryAccountRequest">
<wsdl:part name="secondaryAccount" element="tns:secondaryAccount"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerPrimaryAccountRequestHeaders">
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerSecondaryAccountResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getAccountStateResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyAccountStateResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifySecondaryAccountRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="registerPrimaryAccountResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifySecondaryAccountRequest">
<wsdl:part name="secondaryAccountModifications" element="tns:secondaryAccountModifications"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getAccountStateRequest">
<wsdl:part name="accountName" element="tns:accountName"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyAccountStateRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:portType name="RegisteringWebServicePortType">
<wsdl:operation name="modifyAccountState">
<wsdl:input name="modifyAccountStateRequest" message="tns:modifyAccountStateRequest"> </wsdl:input>
<wsdl:output name="modifyAccountStateResponse" message="tns:modifyAccountStateResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="modifyPrimaryAccount">
<wsdl:input name="modifyPrimaryAccountRequest" message="tns:modifyPrimaryAccountRequest"> </wsdl:input>
<wsdl:output name="modifyPrimaryAccountResponse" message="tns:modifyPrimaryAccountResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="registerSecondaryAccount">
<wsdl:input name="registerSecondaryAccountRequest" message="tns:registerSecondaryAccountRequest"> </wsdl:input>
<wsdl:output name="registerSecondaryAccountResponse" message="tns:registerSecondaryAccountResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="modifySecondaryAccount">
<wsdl:input name="modifySecondaryAccountRequest" message="tns:modifySecondaryAccountRequest"> </wsdl:input>
<wsdl:output name="modifySecondaryAccountResponse" message="tns:modifySecondaryAccountResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="registerPrimaryAccount">
<wsdl:input name="registerPrimaryAccountRequest" message="tns:registerPrimaryAccountRequest"> </wsdl:input>
<wsdl:output name="registerPrimaryAccountResponse" message="tns:registerPrimaryAccountResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getAccountState">
<wsdl:input name="getAccountStateRequest" message="tns:getAccountStateRequest"> </wsdl:input>
<wsdl:output name="getAccountStateResponse" message="tns:getAccountStateResponse"> </wsdl:output>
</wsdl:operation>
</wsdl:portType>
<wsdl:binding name="RegisteringWebServiceHttpBinding" type="tns:RegisteringWebServicePortType">
<wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="modifyAccountState">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="modifyAccountStateRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:modifyAccountStateRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:modifyAccountStateRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="modifyAccountStateResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="modifyPrimaryAccount">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="modifyPrimaryAccountRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:modifyPrimaryAccountRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:modifyPrimaryAccountRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="modifyPrimaryAccountResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="registerSecondaryAccount">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="registerSecondaryAccountRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:registerSecondaryAccountRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:registerSecondaryAccountRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="registerSecondaryAccountResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="modifySecondaryAccount">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="modifySecondaryAccountRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:modifySecondaryAccountRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:modifySecondaryAccountRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="modifySecondaryAccountResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="registerPrimaryAccount">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="registerPrimaryAccountRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:registerPrimaryAccountRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="registerPrimaryAccountResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getAccountState">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getAccountStateRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getAccountStateRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getAccountStateRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getAccountStateResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="RegisteringWebService">
<wsdl:port name="RegisteringWebServiceHttpPort" binding="tns:RegisteringWebServiceHttpBinding">
<wsdlsoap:address location="https://services-teleprocedures.aspone.fr/wspreprod/registering"/>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>

- **Alerte** : [https://services-teleprocedures.aspone.fr/wspreprod/alert?wsdl](https://services-teleprocedures.aspone.fr/wspreprod/alert?wsdl)
<wsdl:definitions xmlns:soapenc11="http://schemas.xmlsoap.org/soap/encoding/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://aspone.fr/mb/webservices" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:soap11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc12="http://www.w3.org/2003/05/soap-encoding" targetNamespace="http://aspone.fr/mb/webservices">
<wsdl:types>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://aspone.fr/mb/webservices">
<xsd:include schemaLocation="https://services-teleprocedures.aspone.fr/wspreprod/schema/common/AlertWS.xsd"/>
<xsd:element name="accountName" type="xsd:string"/>
</xsd:schema>
</wsdl:types>
<wsdl:message name="modifyConfigurationAlertResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getConfigurationAlertResponse">
<wsdl:part name="wsResponse" element="tns:wsResponse"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyConfigurationAlertRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="modifyConfigurationAlertRequest">
<wsdl:part name="configurationAlertModification" element="tns:configurationAlertModification"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getConfigurationAlertRequestHeaders">
<wsdl:part name="context" element="tns:context"> </wsdl:part>
<wsdl:part name="serviceVersion" element="tns:serviceVersion"> </wsdl:part>
</wsdl:message>
<wsdl:message name="getConfigurationAlertRequest">
<wsdl:part name="accountName" element="tns:accountName"> </wsdl:part>
</wsdl:message>
<wsdl:portType name="AlertWebServicePortType">
<wsdl:operation name="modifyConfigurationAlert">
<wsdl:input name="modifyConfigurationAlertRequest" message="tns:modifyConfigurationAlertRequest"> </wsdl:input>
<wsdl:output name="modifyConfigurationAlertResponse" message="tns:modifyConfigurationAlertResponse"> </wsdl:output>
</wsdl:operation>
<wsdl:operation name="getConfigurationAlert">
<wsdl:input name="getConfigurationAlertRequest" message="tns:getConfigurationAlertRequest"> </wsdl:input>
<wsdl:output name="getConfigurationAlertResponse" message="tns:getConfigurationAlertResponse"> </wsdl:output>
</wsdl:operation>
</wsdl:portType>
<wsdl:binding name="AlertWebServiceHttpBinding" type="tns:AlertWebServicePortType">
<wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
<wsdl:operation name="modifyConfigurationAlert">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="modifyConfigurationAlertRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:modifyConfigurationAlertRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:modifyConfigurationAlertRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="modifyConfigurationAlertResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="getConfigurationAlert">
<wsdlsoap:operation soapAction=""/>
<wsdl:input name="getConfigurationAlertRequest">
<wsdlsoap:body use="literal"/>
<wsdlsoap:header message="tns:getConfigurationAlertRequestHeaders" part="serviceVersion" use="literal"> </wsdlsoap:header>
<wsdlsoap:header message="tns:getConfigurationAlertRequestHeaders" part="context" use="literal"> </wsdlsoap:header>
</wsdl:input>
<wsdl:output name="getConfigurationAlertResponse">
<wsdlsoap:body use="literal"/>
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="AlertWebService">
<wsdl:port name="AlertWebServiceHttpPort" binding="tns:AlertWebServiceHttpBinding">
<wsdlsoap:address location="https://services-teleprocedures.aspone.fr/wspreprod/alert"/>
</wsdl:port>
</wsdl:service>
</wsdl:definitions>
---

### 👤 Comptes Utilisateurs de démonstration :

> Tous les interchanges déposés avec les utilisateurs de démonstration fournis **sont automatiquement flaggés en test**.

Les comptes primaires ont les droits d’édition / visualisation sur les comptes secondaires qu’ils administrent.
## 📘 Présentation Fonctionnelle (suite)

> ⚠️ **Attention** : pour certains destinataires, il n’est pas possible de recevoir des CR en RECETTE.

---

### 📊 Tableau des téléprocédures et temps de réponse

| **Téléprocédure** | **Destinataire**              | **Réception CR** | **Temps de réponse**      |
|-------------------|-------------------------------|------------------|----------------------------|
| TVA               | DGFIP                         | Oui              | entre 45mins et 2h         |
|                   | OGA / CEC                     | Non              | -                          |
| TDFC              | DGFIP                         | Oui              | entre 45mins et 2h         |
|                   | Banque de France              | Non              | -                          |
|                   | Banques Commerciales          | Non              | -                          |
|                   | OGA / CEC / ENT / TPE         | Non              | -                          |
| PAIEMENT          | DGFIP                         | Oui              | entre 45mins et 2h         |
|                   | OGA / CE                      | Non              | -                          |
| REQUETE           | DGFIP                         | Oui              | entre 45mins et 2h         |
| IR                | DGFIP                         | Oui              | entre 45mins et 2h         |
|                   | GPA                           | Non              | -                          |
| DUCS              | URSSAF                        | Non              | -                          |
|                   | AGIRC/ARRCO                   | Oui              | entre 15mins et 2h         |
|                   | POLE EMPLOI                   | Non              | -                          |
| DADS-U            | CNAV                          | Oui              | entre 10 et 30mins         |
|                   | AGIRC/ARRCO                   | Oui              | entre 10 et 30mins         |
|                   | NET-ENTREPRISES               | Oui              | entre 10mins et 1h         |
|                   | CI-BTP                        | Oui              | entre 10mins et 1h         |
| DPAE (ex DUE)     | CIRSO                         | Non              | -                          |
| AED               | POLE EMPLOI                   | Oui              | entre 10 et 30mins         |
| DSI               | RSI                           | Non              | -                          |
| DSN               | NET-ENTREPRISES               | Oui              | entre 10 et 30mins         |
|                   | OPS (destinataires finaux)    | Non              | -                          |
| DRP               | MSA                           | Oui              | Entre 1h et 3 jours         |
|                   | OGA / CEC / TPE               | Non              | -                          |
| PART              | DGFIP                         | Oui              | Entre 24h et 72h           |
## 📂 WS Deposit = Dépôt de fichiers

☑️ **Méthodes du WS Deposit**

---

### ✅ addDocument

Dépôt d’un interchange simple EDI ou XML-EDI  
OU  
Dépôt de plusieurs interchanges par l’intermédiaire d’une archive ZIP

> 🔴 *A noter : le mode de dépôt simple ou multiple est automatiquement détecté par le portail par analyse de la pièce jointe.*

---

### ✅ addWebdeclaration

Injection de données dans les formulaires de saisie disponibles dans Web-Déclarations par l’intermédiaire d’un fichier XML-EDI.

> 🟠 *Méthode réservée à un cas d’usage bien particulier du portail consistant à injecter des données dans nos formulaires HTML de saisie en ligne en vue de terminer la saisie manuellement.*
## 📡 WS Monitoring = Suivi des flux 1/2

☑️ **Méthodes du WS Monitoring**

---

### ✅ getInterchangesByDepositID  
Recherche d’interchanges grâce à l’identifiant de dépôt

### ✅ getDeclarationDetails  
Recherche des détails d’une déclaration par son identifiant

### ✅ getRecipientReports  
Récupération des comptes-rendus destinataires par l’identifiant de la déclaration associée  
*(_dépréciée, maintenue pour la rétrocompatibilité, veuillez utiliser `getRecipientReports_v2`_)*
  
### ✅ getRecipientReports_v2  
Récupération des comptes-rendus portail / destinataire par l’identifiant de la déclaration associée  
*(_y compris pour les téléprocédures fiscales_)*
  
### ✅ getRecipientReportById  
Récupération d’un compte-rendu destinataire par son identifiant

### ✅ recipientReportSearch  
Recherche pour une téléprocédure et une période donnée les comptes-rendus destinataires mis à disposition par le portail

### ✅ interchangeSearch  
Recherche d’interchanges par différents critères

### ✅ declarationSearch  
Recherche de déclarations par différents critères
## 📡 WS Monitoring = Suivi des flux 2/2

---

### ✅ findAuthorizedAccountsForMonitoring  
Renvoie la liste des comptes que le compte connecté permet d’administrer (cas des comptes primaires / secondaires).

### ✅ getResponseOgaDocumentById  
Récupération d’une pièce comptable transmise dans une réponse EDI-OGA par un CEC ou une TPE via son identifiant

### ✅ getDeclarativeCertificate  
Permet de télécharger un justificatif PDF lorsqu’une télédéclaration fiscale (TVA, TDFC, PAIEMENT, IR, PART) ou DSI est acceptée par l’organisme destinataire.

### ✅ getEdiFiles  
Permet de télécharger les fichiers EDI déposés ou reçus

### ✅ getXmlFiles  
Permet de télécharger les fichiers XML déposés (cas d’un dépôt XML) ou produits (cas d’un dépôt WEB)

### ✅ receptionSearch  
Permet de lister les déclarations / demandes / documents reçus

### ✅ getInterchangeByWebdeclarationId  
Recherche de l’interchange grâce à l’identifiant de la web-déclaration soumise
## 🧾 WS Registering = Inscription

☑️ **Méthodes du WS Registering**

---

### ✅ registeringPrimaryAccount  
Inscription d’un compte primaire

### ✅ registeringSecondaryAccount  
Inscription d’un compte secondaire (à associer à un compte primaire)

### ✅ getAccountState  
Récupération de l’état d’un compte  
> _(Un compte est pleinement fonctionnel qu’à partir du moment où il a été validé par nos services et qu’il passe à l’état `REGISTERED`)_

### ✅ modifyPrimaryAccount  
Modification des infos associées à un compte primaire

### ✅ modifySecondaryAccount  
Modification des infos associées à un compte secondaire
## 🔔 WS Alert = Paramétrage alertes mails

☑️ **Méthodes du WS Alert**

---

### ✅ getConfigurationAlert  
Récupération de la configuration courante des alertes mails

### ✅ modifyConfigurationAlert  
Modification de la configuration des alertes mails

## 🔁 Principe du suivi d’un dépôt 1/3

---

### ✅ Étapes recommandées (Bonne pratique – Suivi par identifiant)

#### 1. Dépôt

- **1a. Dépôt**  
  `Deposit.addDocument`

- **1b. Injection Web-déclaration**  
  `Deposit.addWebdeclaration`  
  *L’utilisateur termine la saisie en ligne et soumet manuellement sa déclaration*

---

#### 2. Suivi Interchange

- **2a. Suivi Interchange par depositID**  
  `Monitoring.getInterchangesByDepositID`

- **2b. Suivi Interchange par webdeclarationId**  
  `Monitoring.getInterchangeByWebdeclarationId`

---

#### 3. Suivi Déclaration

- `Monitoring.getDeclarationDetails`  
  *(Recherche par declarationId)*

---

#### 4. Récupération des comptes-rendus destinataires

- **4.** `Monitoring.getRecipientReports_v2`  
  *(Recherche par declarationId)*

OU

- **4a.** `Monitoring.recipientReportSearch`  
  *(Recherche par plage de date – Utile notamment en DSN quand on ne sait pas à l’avance combien de CR sont attendus)*

- **4b.** `Monitoring.getRecipientReportById`  
  *(Recherche par reportId)*

---

### 🚫 À éviter = moins performant (Suivi par critères)

- **Suivi Interchange**  
  `Monitoring.interchangeSearch`  
  *→ Sélection par critères : date de dépôt, type…*

- **Suivi Déclaration**  
  `Monitoring.declarationSearch`  
  *→ Sélection par critères : date de dépôt, type…*

  ## 🔁 Principe du suivi d’un dépôt 2/3

☑️ **Suivi par identifiant d’un dépôt standard**

| **Étape** | **Libellé**                                                        | **Méthode**                               | **Paramètre en entrée**         | **Commentaires**                                                                                       |
|----------|---------------------------------------------------------------------|-------------------------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------|
| 1a       | Dépôt d’un fichier                                                  | Deposit.AddDocument                        | Fichier EDI ou ZIP               | En retour, on indique l’identifiant unique du dépôt `depositId`                                      |
| 2a       | Récupération de la liste des interchanges contenus dans un dépôt   | Monitoring.getInterchangesByDepositID      | depositId                        | En retour, une liste d’objets "interchanges". Chaque interchange peut contenir 1 à n déclarations     |
|          | **POUR CHAQUE INTERCHANGE**                                         |                                           |                                  |                                                                                                        |
|          | **POUR CHAQUE DÉCLARATION**                                         |                                           |                                  |                                                                                                        |
| 3        | Récupération du détail d’une déclaration                            | Monitoring.getDeclarationDetails           | declarationId                   | Récupération du détail d’une déclaration                                                              |
| 4        | Récupération des comptes-rendus destinataires                       | Monitoring.getRecipientReports_v2          | declarationId                   | Récupération des comptes rendus destinataires (HMTL, TEXTE, PDF, EDI)                                 |
| OU       |                                                                     |                                           |                                  |                                                                                                        |
| 4a       | Recherche des comptes-rendus destinataires                         | Monitoring.recipientReportSearch           | Teleprocedure + Plage de dates  | Récupération d’une liste de comptes-rendus avec notamment l’identifiant `idRecipientReport`           |
|          | **POUR CHAQUE COMPTE-RENDU**                                        |                                           |                                  |                                                                                                        |
| 4b       | Récupération d’un compte-rendu destinataire                         | Monitoring.getRecipientReportById          | idRecipientReport               |                                                                                                        |
|          | **FIN POUR CHAQUE COMPTE-RENDU**                                    |                                           |                                  |                                                                                                        |
|          | **FIN POUR CHAQUE DÉCLARATION**                                     |                                           |                                  |                                                                                                        |
|          | **FIN POUR CHAQUE INTERCHANGE**                                     |                                           |                                  |                                                                                                        |
## 🔁 Principe du suivi d’un dépôt 3/3

☑️ **Suivi par identifiant de l’injection d’une web-déclaration**

| **Étape** | **Libellé**                                                     | **Méthode**                                   | **Paramètre en entrée**         | **Commentaires**                                                                                                                                             |
|----------|------------------------------------------------------------------|-----------------------------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1b       | Injection d’une web-déclaration                                  | Deposit.AddWebdeclaration                     | Fichier XML ou ZIP               | Le fichier ZIP doit contenir un fichier XML et éventuellement une pièce complémentaire (ex : balance CSV). <br>En retour : `webdeclarationId`              |
| 2b       | Récupération de l’interchange associé à la web-déclaration       | Monitoring.getInterchangeByWebdeclarationId   | webdeclarationId                 | En retour : l’interchange associé contenant 1 à n déclarations (`declarationId`). <br>⚠️ L’utilisateur doit avoir terminé la saisie pour que l’ID soit créé |

|          | **POUR CHAQUE DÉCLARATION**                                      |                                               |                                  |                                                                                                                                                              |
| 3        | Récupération du détail d’une déclaration                         | Monitoring.getDeclarationDetails              | declarationId                   | Récupération du détail d’une déclaration                                                                                                                     |
| 4        | Récupération des comptes-rendus destinataires                    | Monitoring.getRecipientReports_v2             | declarationId                   | Récupération des comptes rendus destinataires (HMTL, TEXTE, PDF, EDI)                                                                                         |

| OU       |                                                                  |                                               |                                  |                                                                                                                                                              |
| 4a       | Recherche des comptes-rendus destinataires                      | Monitoring.recipientReportSearch              | Téléprocédure + Plage de dates  | Récupération d’une liste de comptes-rendus avec notamment l’identifiant `idRecipientReport`                                                                  |
|          | **POUR CHAQUE COMPTE-RENDU**                                     |                                               |                                  |                                                                                                                                                              |
| 4b       | Récupération d’un compte-rendu destinataire                      | Monitoring.getRecipientReportById             | idRecipientReport               |                                                                                                                                                              |
|          | **FIN POUR CHAQUE COMPTE-RENDU**                                 |                                               |                                  |                                                                                                                                                              |
|          | **FIN POUR CHAQUE DÉCLARATION**                                  |                                               |                                  |                                                                                                                                                              |
## 📥 Principe du suivi d’une réception 1/2

Certains comptes utilisateurs reçoivent des déclarations (OGA / CEC en TVA / TDFC / PAIEMENT)  
ou des demandes / réponses (CEC ou TPE / OGA dans le cadre de l’EPS / ECCV).

---

### ✅ Bonne pratique = fonctionnement optimal

🟢 **Suivi par critères**

#### 1. Suivi Réception  
`Monitoring.receptionSearch`  
→ Sélection des documents reçus par critères : plage de dates de réception*, type, etc.

#### 2. Récupération du détail  
`Monitoring.getDeclarationDetails`  
→ Recherche par `declarationId`

#### 3. Téléchargement du fichier EDI  
`Monitoring.getEdiFiles`  
→ Téléchargement par `declarationId`

---

📝 *Afin de minimiser les temps de réponse, il est conseillé de définir une plage de réception la plus restreinte possible (pas plus de quelques jours).
## 📥 Principe du suivi d’une réception 2/2

☑️ **Suivi par critères**

| **Étape** | **Libellé**                                 | **Méthode**                        | **Paramètre en entrée**                   | **Commentaires**                                                                                       |
|----------|----------------------------------------------|------------------------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------|
| 1        | Récupération de la liste des documents reçus | Monitoring.receptionSearch         | Critères (plage de dates de réception)    | En retour, une liste d’objets `declaration`                                                           |
|          | **POUR CHAQUE DÉCLARATION**                  |                                    |                                           |                                                                                                        |
| 2        | Récupération du détail d’une déclaration      | Monitoring.getDeclarationDetails   | declarationId                             | Plus d’informations sur la déclaration                                                                |
| 3        | Téléchargement du fichier EDI                | Monitoring.getEdiFiles             | declarationId                             | Téléchargement du fichier EDI* contenant la déclaration                                               |
|          | **FIN POUR CHAQUE DÉCLARATION**              |                                    |                                           |                                                                                                        |

---

📝 *Le fichier EDI peut contenir d’autres déclarations reçues dans le cas où plusieurs déclarations à destination du même destinataire ont été groupées dans le même fichier.*
## 🧾 GetInterchangesByDepositID 1/3

☑️ **GetInterchangesByDepositID = Récupération des détails des interchanges par l’ID de dépôt**

Retourne autant de nœuds `<interchange>` que de fichiers contenus dans le dépôt  
(1 seul interchange si dépôt simple, plusieurs si dépôt d’une archive ZIP contenant plusieurs interchanges)

---

### ➤ Informations générales retournées :

```xml
<interchange>
  <depositId>299FABBF-9AF7-4BBD-A3AA-7D524572EDA8</depositId>
  <interchangeId>1767932</interchangeId>
  <depositDate>2012-07-12T13:36:50.000+02:00</depositDate>
  <depositSubject>Test WSÉ Dépôt Simple</depositSubject> <!-- Sujet fourni lors du dépôt -->
  <numADS>17700300</numADS>
  <adsDate>2012-07-12T13:36:52.000+02:00</adsDate>
  <alias>djarnax@aspone.fr</alias>
  <version>V01X06</version>
  <isTest>true</isTest>
  <deposantAccount>
    <name>djarnax</name>
  </deposantAccount>
  <teleProcedure>ADS</teleProcedure>
</interchange>
## 🧾 GetInterchangesByDepositID 2/3

### ➤ Pile d’historique des états d’un interchange :

```xml
<statesHistory>
  <stateHistory>
    <name>TRANSLATED_OK</name>
    <label>Contrôle syntaxique de l'interchange</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T13:38:45.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>TRANSLATION_PENDING</name>
    <label>Soumission de l'interchange pour traitements EDI</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T13:38:42.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>DEPOSED</name>
    <label>Dépôt de l'interchange sur le portail</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T13:36:52.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
</statesHistory>
📌 États possibles :
	•	DEPOSED : Déposé mais pas encore traité
	•	TRANSLATION_PENDING : En cours de traitement/traduction
	•	TRANSLATED_OK : Traité / traduit
	•	TRANSLATED_KO : L’interchange n’a pas pu être traduit (anomalie globale)
	•	PROCESSED : Au moins un TD rejeté, les autres ont reçu un acquittement (positif/négatif)
	•	FULLY_PROCESSED : Tous les TD ont reçu un acquittement (positif/négatif) — le statut s’applique aux déclarations

⸻

🔖 Attributs :
	•	isError : indique si c’est un statut d’erreur
	•	isFinal : indique si c’est un statut final (pas de changement de statut possible)
## 🧾 GetInterchangesByDepositID 3/3

### ➤ Liste des déclarations contenues dans l’interchange :

```xml
<declarationIds>
  <declarationId>79BC3430253982D9D936AD5BAF3CF9B4</declarationId>
  <declarationId>85B65350653952D6019D6AD5BAF3CKMLD</declarationId>
</declarationIds>
📌 Si l’interchange est au statut TRANSLATED_KO, l’éclatement en déclaration n’a pas pu avoir lieu :
➡️ la liste de <declarationIds> est donc vide.
## 📄 GetDeclarationDetails 1/7

☑️ **GetDeclarationDetails = Récupération des détails d’une déclaration par son identifiant**

---

### ➤ Informations générales retournées :

```xml
<declarationId>79BC3430253982D9D936A5DAF3CF9B4</declarationId>
<declarantSiret>77567187800186</declarantSiret>
<numDossier>77567187800186</numDossier>
<nameDossier>TEST ABD DPV – NE PAS TOUCHER</nameDossier>
<recipient>
  <name>POLE_EMPLOI</name>
  <type>POLE_EMPLOI</type>
</recipient>
<periodStart>2012-01-01T01:00</periodStart>
<periodEnd>2012-04-15T02:00</periodEnd>
<numInterchangeDestinataire>PRD015EABD1767932</numInterchangeDestinataire>
<waitForCR>false</waitForCR>
ℹ️ À propos du champ <waitForCR> :

Flag indiquant si la déclaration est en attente de compte-rendu destinataire :

	•	true : en attente de CR
	•	false : tous les CR destinataires ont été réceptionnés

🧩 Voir en annexes la liste et les temps de réception moyens des CR sociaux.
## 📄 GetDeclarationDetails 2/7

### ➤ Informations générales sur l’interchange associé :

```xml
<interchange>
  <depositId>299FABBF-9AF7-4BBD-A3AA-7D524572EDA8</depositId>
  <interchangeId>1767932</interchangeId>
  <depositDate>2012-07-12T13:36:50.000+02:00</depositDate>
  <depositSubject>Test WSÉ Dépôt Simple</depositSubject>
  <numADS>17700300</numADS>
  <adsDate>2012-07-12T13:36:52.000+02:00</adsDate>
  <alias>djarnax@aspone.fr</alias>
  <version>V01X06</version>
  <isTest>true</isTest>
  <deposantAccount>
    <name>djarnax</name>
  </deposantAccount>
  <teleProcedure>ABD</teleProcedure>
  <statesHistory/>
</interchange>
## 📄 GetDeclarationDetails 3/7

### ➤ Pile d’historique d’une **déclaration acceptée** :

```xml
<statesHistory>
  <stateHistory>
    <name>ACCEPTED_BY_DESTINATION</name>
    <label>Compte-rendu du destinataire positif</label>
    <isError>false</isError>
    <isFinal>true</isFinal>
    <date>2012-07-12T13:41:46.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>SENT</name>
    <label>Routage de la déclaration vers le destinataire</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T13:39:35.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>TRANSLATED_OK</name>
    <label>Contrôles syntaxique et sémantique de la déclaration</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T13:38:45.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
</statesHistory>
## 📄 GetDeclarationDetails 4/7

### ➤ Pile d’historique d’une **déclaration rejetée par le portail** :

```xml
<statesHistory>
  <stateHistory>
    <name>TRANSLATED_KO</name>
    <label>Échec du contrôle de la déclaration</label>
    <isError>true</isError>
    <isFinal>true</isFinal>
    <date>2012-07-12T09:43:14.000+02:00</date>
    <stateDetailsHistory>
      <stateDetail>
        <name>TRANSLATED_KO</name>
        <label>Générale DADSU TD</label>
        <isError>true</isError>
        <isFinal>false</isFinal>
        <date>2012-07-12T09:43:14.000+02:00</date>
        <detailedLabel>
          Ligne 227, Structure S65, Groupe G43, Sous groupe 10 :  
          Valeur attendue : M656 / Valeur incohérente /  
          Un agent relevant de la CNRACL ou du FSPOIE ne peut être déclaré avec plusieurs autres cotisations  
          de même code type S65.G43.10.001  
          Valeur lue : 20, Libellé Rubrique : Code nature de la cotisation
        </detailedLabel>
      </stateDetail>
    </stateDetailsHistory>
  </stateHistory>
</statesHistory>
📌 Le détail du rejet portail se situe dans la balise <detailedLabel>.
## 📄 GetDeclarationDetails 5/7

### ➤ Pile d’historique d’une **déclaration sociale rejetée par le destinataire** :

```xml
<statesHistory>
  <stateHistory>
    <name>REJECTED_BY_DESTINATION</name>
    <label>Compte-rendu du destinataire négatif</label>
    <isError>true</isError>
    <isFinal>true</isFinal>
    <date>2012-07-12T10:32:32.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>SENT</name>
    <label>Routage de la déclaration vers le destinataire</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T10:25:38.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
  <stateHistory>
    <name>TRANSLATED_OK</name>
    <label>Contrôles syntaxique et sémantique de la déclaration</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T10:24:47.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
</statesHistory>
📝 En social, le détail des erreurs se trouve dans le compte-rendu (PDF, HTML ou Texte)
mis à disposition par la méthode getRecipientReports.
## 📄 GetDeclarationDetails 6/7

### ➤ Pile d’historique d’une **déclaration fiscale rejetée par le destinataire** :

```xml
<statesHistory>
  <stateHistory>
    <name>REJECTED_BY_DESTINATION</name>
    <label>Compte-rendu du destinataire négatif</label>
    <isError>true</isError>
    <isFinal>true</isFinal>
    <date>2012-07-12T11:42:02.000+02:00</date>
    <stateDetailsHistory>
      <stateDetail>
        <name>REJECTED_BY_DESTINATION</name>
        <label>Déclaration TVA et télépaiements rejetés</label>
        <isError>true</isError>
        <isFinal>false</isFinal>
        <date>2012-07-12T11:42:02.000+02:00</date>
        <detailedLabel>
          Code ER 84 S3157ACAL2 non valide pour la période déclarée.  
          Code Erreur : 179. Rejet RT
        </detailedLabel>
      </stateDetail>
    </stateDetailsHistory>
  </stateHistory>

  <stateHistory>
    <name>SENT</name>
    <label>Routage de la déclaration vers le destinataire</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T10:43:47.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>

  <stateHistory>
    <name>TRANSLATED_OK</name>
    <label>Contrôles syntaxique et sémantique de la déclaration</label>
    <isError>false</isError>
    <isFinal>false</isFinal>
    <date>2012-07-12T09:39:48.000+02:00</date>
    <stateDetailsHistory/>
  </stateHistory>
</statesHistory>
📌 En fiscal, le détail des erreurs se trouve directement dans la réponse à la méthode GetDeclarationDetails
👉 Pas besoin de récupérer de CR séparément
## 📄 GetDeclarationDetails 7/7

### ➤ En fonction du type de déclaration (TVA, DUCS, AED…), des informations spécifiques sont fournies :

- **Fiscal** : la référence d’obligation fiscale (ROF), le FRP, la liste des formulaires présents…
- **EDI-TVA, EDI-PAIEMENT et DUCS** : des informations sur le(s) télérèglement(s)
- **DPAE (ex DUE) et AED** : des informations sur le salarié concerné

---

🔗 *Se reporter aux spécifications détaillées de la méthode `getDeclarationDetails` pour plus de précisions.*
## 📬 GetRecipientReports_v2 1/2

☑️ **GetRecipientReports_v2 = Récupération des comptes rendus portail / destinataire**

---

### ➤ Dans les paramètres d’entrée, on peut indiquer :

- si l’on veut récupérer les CR **zippés** (`true`) ou non (`false`, par défaut)  
- et éventuellement le **type de CR** souhaité

---

### 🧾 Exemple de requête SOAP :

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://aspone.fr/mb/webservices">
  <soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
      <web:user>
        <web:login>djarnax</web:login>
        <web:password>******</web:password>
      </web:user>
    </web:context>
  </soapenv:Header>
  <soapenv:Body>
    <web:getRecipientReportsSearchCriteria_v2>
      <web:declarationId>582315E7-440F-A234-DB84-3BC3EEE3A422</web:declarationId>
      <web:zip>false</web:zip>
      <web:type>FCR_INFENT_REF</web:type>
    </web:getRecipientReportsSearchCriteria_v2>
  </soapenv:Body>
</soapenv:Envelope>
## 📬 GetRecipientReports_v2 2/2

### ➤ Réponse à la requête :

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body xmlns:ns1="http://aspone.fr/mb/webservices">
    <ns1:wsResponse xmlns:ns1="http://aspone.fr/mb/webservices">
      <responseType>SUCCESS</responseType>
      <response>
        <successfulResponse xsi:type="GetRecipientReportsResponse_v2">
          <RecipientReports>
            <availableCR>1</availableCR> <!-- Nombre de CR disponibles pour cette déclaration -->
            <waitForCR>false</waitForCR> <!-- false = tous les CR ont été réceptionnés -->
            <recipient>
              <name>DGI</name>
              <type>DGI</type> <!-- Destinataire ayant renvoyé les CR -->
            </recipient>
            <report>
              <data>
                <xop:Include href="cid:1500627530898321342539167@https://aspone.fr/mb/webservices"
                             xmlns:xop="http://www.w3.org/2004/08/xop/include"/> <!-- Référence vers la pièce jointe -->
              </data>
              <filename>FCR_INFENT_REP_SORTANT_2F4E23A7-5F87-7489-7CB3-F7154007E1B9.edi</filename> <!-- Nom du CR -->
              <zip>false</zip> <!-- Indique si le CR est zippé -->
              <type>FCR_INFENT_REP</type>
              <receptionDate>2017-07-17T12:35:44.000+02:00</receptionDate>
            </report>
          </RecipientReports>
        </successfulResponse>
      </response>
    </ns1:wsResponse>
  </soap:Body>
</soap:Envelope>
📌 Éléments importants de la réponse :
	•	<availableCR> : nombre de comptes-rendus disponibles pour cette déclaration
	•	<waitForCR> : false indique que tous les CR attendus ont été réceptionnés
	•	<recipient> : destinataire ayant renvoyé le CR
	•	<filename> : nom de la pièce jointe du CR
	•	<zip> : false → CR non compressé, true → CR compressé
	•	<xop:Include> : lien vers la pièce jointe contenant le CR
## 📬 RecipientReportSearch 1/2

☑️ **RecipientReportSearch = Recherche des compte-rendus destinataires mis à disposition dans un intervalle de temps**

---

### 🧾 Exemple de requête SOAP :

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://aspone.fr/mb/webservices">
  <soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
      <web:user>
        <web:login>djarnax</web:login>
        <web:password>******</web:password>
      </web:user>
    </web:context>
  </soapenv:Header>
  <soapenv:Body>
    <web:recipientReportSearchCriteria>
      <web:accountName>djarnax</web:accountName> <!-- Compte utilisateur concerné -->
      <web:teleProcedure>DSN</web:teleProcedure> <!-- Téléprocédure -->
      <web:periodStartDate>2017-05-10T17:10:00</web:periodStartDate> <!-- Intervalle de temps -->
      <!-- Optional : -->
      <web:periodEndDate>2017-05-15T17:10:00</web:periodEndDate> <!-- Max 7 jours -->
      <web:avCompteSecondaire>false</web:avCompteSecondaire> <!-- Inclure ou non les comptes secondaires -->
    </web:recipientReportSearchCriteria>
  </soapenv:Body>
</soapenv:Envelope>
📌 Paramètres à retenir :
	•	accountName : login du compte principal
	•	teleProcedure : code de la téléprocédure (ex : DSN, TVA…)
	•	periodStartDate / periodEndDate : plage de dates (maximum 7 jours)
	•	avCompteSecondaire : true pour inclure les comptes secondaires
## 📬 RecipientReportSearch 2/2

### ➤ Réponse à la requête :

```xml
<successfulResponse xsi:type="RecipientReportSearchResponse">
  <recipientReportsList>
    <recipientReport>
      <receptionDate>2017-05-11T02:00</receptionDate>
      <idRecipientReport>220016</idRecipientReport> <!-- Identifiant unique du CR -->
      <declarationId>005182A6041482BFB7E5C07AC0347E</declarationId>
      <teleProcedure>DSN</teleProcedure>
      <declarantSiren>431770437</declarantSiren>
      <declarantNic>00205</declarantNic>
      <nameDossier>SAROUY_SARL</nameDossier>
      <numADS>61786</numADS>
      <isReal>false</isReal>
      <accountName>bruno1</accountName>
      <type>COMPTE_RENDU_TRAITEMENT</type>
    </recipientReport>
    
    <recipientReport>
      <receptionDate>2017-05-11T02:00</receptionDate>
      <idRecipientReport>220015</idRecipientReport>
      <declarationId>005182A6041482BFB7E5C07AC0347E</declarationId>
      <teleProcedure>DSN</teleProcedure>
      <declarantSiren>431770437</declarantSiren>
      <declarantNic>00205</declarantNic>
      <nameDossier>SAROUY_SARL</nameDossier>
      <numADS>61786</numADS>
      <isReal>false</isReal>
      <accountName>bruno1</accountName>
      <type>COMPTE_RENDU_TRAITEMENT</type>
    </recipientReport>
  </recipientReportsList>
</successfulResponse>
📌 idRecipientReport est l’identifiant unique de chaque compte-rendu.
👉 Il est utilisé comme paramètre d’entrée dans la méthode GetRecipientReportById.
## 📬 GetRecipientReportById 1/2

☑️ **GetRecipientReportById = Récupération d’un compte-rendu destinataire par identifiant**

---

### 🧾 Exemple de requête SOAP :

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://aspone.fr/mb/webservices">
  <soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
      <web:user>
        <web:login>djarnax</web:login>
        <web:password>******</web:password>
      </web:user>
    </web:context>
  </soapenv:Header>
  <soapenv:Body>
    <web:recipientReportId>22016</web:recipientReportId> <!-- Identifiant unique du CR -->
    <web:zip>false</web:zip> <!-- CR compressé ou non dans une archive ZIP -->
  </soapenv:Body>
</soapenv:Envelope>
⚠️ Attention : il n’est pas possible de récupérer les CR fiscaux.
👉 Cela est uniquement possible pour le social (voir en annexe Comptes Rendus Sociaux).
## 📬 GetRecipientReportById 2/2

### ➤ Réponse à la requête :

```xml
<successfulResponse xsi:type="GetRecipientReportByIdResponse">
  <report>
    <data>
      <xop:Include href="cid:1497879078768348461167560051@http://aspone.fr/mb/webservices"
                   xmlns:xop="http://www.w3.org/2004/08/xop/include"/>
                   <!-- Référence vers la pièce jointe contenant les données du CR -->
    </data>
    <filename>cr.html</filename>
    <zip>false</zip>
    <type>COMPTE_RENDU_TRAITEMENT</type>
    <initialRecipient>Net-Entreprises</initialRecipient>
  </report>
</successfulResponse>
💡 Le fichier du compte rendu est accessible via une pièce jointe référencée dans le xop:Include.
## 📄 GetResponseOgaDocumentById 1/2

### 🔹 GetResponseOgaDocumentById = Récupération d’une pièce comptable EDI-OGA

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://aspone.fr/mb/webservices">
  <soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
      <web:user>
        <web:login>user</web:login>
        <web:password>mdp</web:password>
      </web:user>
    </web:context>
  </soapenv:Header>
  <soapenv:Body>
    <web:getResponseOgaDocumentByIdCriteria>
      <web:id>2</web:id> <!-- Identifiant de la pièce généré par le portail -->
    </web:getResponseOgaDocumentByIdCriteria>
  </soapenv:Body>
</soapenv:Envelope>
ℹ️ L’identifiant de la pièce est généré par le portail et peut être trouvé dans le détail d’une réponse.

⸻

📝 À noter :
	•	Les pièces comptables sont également disponibles dans l’AIS de type FCR_PIELIB_REP (format EDIFACT) dans la réponse classique.
	•	Le portail extrait automatiquement les pièces du fichier EDI pour les mettre à disposition via cette méthode.
	•	Il faut d’abord consulter la réponse (via GetRecipientReports) pour obtenir les identifiants des pièces.
## 📄 GetResponseOgaDocumentById 2/2

### ➤ Réponse à la requête :

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body xmlns:ns1="http://aspone.fr/mb/webservices">
    <ns1:wsResponse xmlns:ns1="http://aspone.fr/mb/webservices">
      <responseType>SUCCESS</responseType>
      <response>
        <successfulResponse xsi:type="GetResponseOgaDocumentByIdResponse">
          <document>
            <id>2</id>
            <type>FEC</type>
            <filename>FEC-EXEMPLE.zip</filename>
            <label>FEC-EXEMPLE.zip</label>
            <receptionDate>2017-10-31T18:24:17.000+01:00</receptionDate>
            <compression>LZMA</compression>
            <encoding>UTF_8</encoding>
            <format>SEX</format>
            <data>
              <xop:Include href="cid:151127543944520118061852798@http://aspone.fr/mb/webservices"
                           xmlns:xop="http://www.w3.org/2004/08/xop/include"/>
            </data>
          </document>
        </successfulResponse>
      </response>
    </ns1:wsResponse>
  </soap:Body>
</soap:Envelope>
📎 Note : La balise <xop:Include> contient un identifiant cid qui référence la pièce jointe MIME dans le message. C’est à cet endroit que se trouvent les données de la pièce comptable à récupérer.
02/ TESTS AVEC SOAPUI
## 🧪 Tests avec SoapUI

SOAPUI est un client webservice universel qui permet de tester la plupart des Webservices.

### ✅ Télécharger SOAPUI à l’adresse suivante :

https://www.soapui.org/downloads/soapui.html

### ✅ Créer un nouveau projet par webservice :

**File → New SOAPUI Project**

> ![New SoapUI Project](soapui_project_creation.png)
# Tests avec SoapUI

## 🔲 La boîte de dialogue suivante s’ouvre

---

### Capture d’écran :

[New soapUI Project window]
                    [OK] [Cancel]
---

### 📝 Explications à droite de la capture :

- **Project Name** = nom du projet (ce qu’on veut)
- **Initial WSDL / WADL** = l’URL du fichier `.wsdl` du webservice

---

# Tests avec SoapUI

## 🔲 Répéter la création de nouveaux projets SOAPUI pour les 3 Webservices à tester

Chaque nœud représenté par des flèches rouges correspond à une méthode disponible sur le webservice.

---

### Capture d’écran : Navigation dans SoapUI
# Tests avec SoapUI

## 🔲 Attention de bien vérifier dans la barre d’adresse que l’URL commence par HTTPS :

![Capture SoapUI - HTTPS obligatoire](https://services-teleprocedures.aspone.fr/wspreprod/registering)

**Il faut impérativement passer par le protocole HTTPS sinon la requête ne fonctionnera pas.**

Si ce n’est pas le cas, rajouter le « s » à http en éditant l’URL dans la barre d’adresse.

---

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header>
    <web:serviceVersion>?</web:serviceVersion>
  </soapenv:Header>
  <soapenv:Body>
    <web:primaryAccount>
      <web:name>?</web:name>
      <!--Optional:-->
      <web:socialAgentName>?</web:socialAgentName>
      <!--Optional:-->
    </web:primaryAccount>
  </soapenv:Body>
</soapenv:Envelope>
# Tests avec SoapUI

## 🔲 Panneau « Request Properties »

### Les paramètres importants à changer :

- **Name** : mettre ce qu’on veut  
  _Exemple : « Dépôt DADSU »_

- **Username** : ASPONE

- **Password** : mdpaspone

- **WSS-Password Type** : PasswordDigest

> Le couple Username / Mot de passe correspond ici aux identifiants de « la marque blanche ».  
> En **PRODUCTION**, une « marque blanche » est créée par client pour cloisonner les flux.

---

### Exemple de panneau *Request Properties* dans SoapUI :

| Property                        | Value                                          |
|--------------------------------|------------------------------------------------|
| Name                           | Request 1                                      |
| Description                    |                                                |
| Message Size                   | 657                                            |
| Encoding                       | UTF-8                                          |
| Endpoint                       | https://services-teleprocedures.aspone.fr/... |
| Timeout                        |                                                |
| Bind Address                   |                                                |
| Follow Redirects               | true                                           |
| Username                       | ASPONE                                         |
| Password                       | ***************                                |
| Domain                         |                                                |
| WSS-Password Type              | PasswordDigest                                 |
| WSS TimeToLive                 |                                                |
| SSL Keystore                   |                                                |
| Skip SOAP Action               | false                                          |
| Enable MTOM                    | false                                          |
| Force MTOM                     | false                                          |
| Inline Response Attachments    | false                                          |
| Expand MTOM Attachments        | false                                          |
| Disable multiparts             | true                                           |
# Tests avec SoapUI

## 🔲 Entête de la requête SOAP :

Toutes les requêtes SOAP (sauf la requête d’inscription de compte primaire) comportent une entête avec les paramètres suivants :

- **ServiceVersion** : 1.0
- **Login** du compte utilisateur
- **Mot de passe** du compte (**en clair**)

> Le mot de passe est en clair dans la requête mais ne transite pas en clair entre le client et le serveur puisqu’on utilise le protocole HTTPS !

---

### Exemple d’entête SOAP :

```xml
<soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
        <web:user>
            <web:login>usrdemo</web:login>
            <web:password>xxxxxxx</web:password>
        </web:user>
    </web:context>
</soapenv:Header>
03/ ASTUCES SOAPUI
# Astuces SoapUI

## 🔲 Webservice « Deposit » : comment attacher une pièce jointe ?

### 1. Ajout du namespace « xop »

Au niveau de l’enveloppe SOAP, charger le namespace `xop` en ajoutant :

```xml
xmlns:xop="http://www.w3.org/2004/08/xop/include"
2. Remplacer la valeur de la balise <web:data> par :
<xop:Include href="cid:data"/>
Exemple complet :
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://aspone.fr/mb/webservices"
    xmlns:xop="http://www.w3.org/2004/08/xop/include">

    <soapenv:Header>
        <web:serviceVersion>1.0</web:serviceVersion>
        <web:context>
            <web:user>
                <web:login>usrdemo</web:login>
                <web:password>xxxxxxxx</web:password>
            </web:user>
        </web:context>
    </soapenv:Header>

    <soapenv:Body>
        <web:subject>Test dépôt WS</web:subject>
        <web:teleProcedure>AED</web:teleProcedure>
        <web:data>
            <xop:Include href="cid:data"/>
        </web:data>
    </soapenv:Body>

</soapenv:Envelope>
# Astuces SoapUI

## 🔲 Webservice « Deposit » : comment attacher une pièce jointe ?

L’onglet **« Attachments »** en bas permet de charger le fichier EDI ou ZIP à envoyer :

![Capture Attachments](attachments.png) ← *(à intégrer si tu ajoutes les images dans un projet md complet)*

---

### 🔧 Procédure

Cliquer sur l’icône `📎` pour aller chercher un fichier sur le disque dur de l’ordinateur local.

Renseigner ensuite les paramètres suivants :

- **Content Type** : `application/octet-stream`
- **Part** : choisir `anonymous`
- **Type** : `UNKNOWN`
- **ContentID** : `data`
- **Cached** : **cocher la case**
# Astuces SoapUI

## 🔲 Comment exécuter une requête ?

🟦 Il suffit de cliquer sur l’icône ▶️ pour lancer la requête.

---

### 🧪 Exemple de requête SOAP envoyée :

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://cegedim.com/aspone/ws/webservices"
                  xmlns:xop="http://www.w3.org/2004/08/xop/include">
  <soapenv:Header>
    <web:serviceVersion>1.0</web:serviceVersion>
    <web:context>
      <web:user>
        <web:login>usrdemo</web:login>
        <web:password>xxxxxxx</web:password>
      </web:user>
    </web:context>
  </soapenv:Header>
  <soapenv:Body>
    <web:subject>Test dépôt WS 10/10/2011</web:subject>
    <web:teleProcedure>TDFC</web:teleProcedure>
    <web:data>
      <xop:Include href="cid:data"/>
    </web:data>
  </soapenv:Body>
</soapenv:Envelope>
📩 Réponse SOAP reçue :
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ns1="http://cegedim.com/aspone/ws/webservices">
  <soap:Body>
    <ns1:wsResponse>
      <responseType>SUCCESS</responseType>
      <response>
        <successfullResponse xsi:type="ns1:AddDocumentResponse">
          <depositId>ABFF6696-BF60-47F3-A4A4-C6701D9C8F3C</depositId>
        </successfullResponse>
      </response>
    </ns1:wsResponse>
  </soap:Body>
</soap:Envelope>
🟢 La réponse s’affiche à droite : SUCCESS ou ERROR
# Astuces SoapUI

## 🔲 Webservice « Monitoring » : comment récupérer une pièce jointe ?

Lorsque la réponse contient une pièce jointe (un compte rendu destinataire par exemple), il est possible de la récupérer dans l’onglet **Attachments** de la réponse :

### 📄 Exemple de structure XML de réponse contenant une pièce jointe :

```xml
<data>
  <xop:Include href="cid:131831481767036132941905694" />
</data>
<filename>cr.html</filename>
<zip>true</zip>
</report>
</RecipientReports>
</successfullResponse>
</response>
</wsResponse>
</soap:Body>
</soap:Envelope>
📎 Affichage dans l’onglet « Attachments » :
| Name           | Content type    | Size | Part           | Type | ContentID                  |
|----------------|------------------|------|----------------|------|-----------------------------|
| 1318314817670… | application/zip  | 2126 | 1318314817670… | XOP  | 1318314817670…@aspose.fr   |
✅ Remarque : il est possible de cliquer sur l’onglet Attachments pour ouvrir ou sauvegarder la pièce jointe localement.
04/ ANNEXES
| Téléprocédure     | Destinataire                   | Nombre de CR | Format       | Temps de réponse           | Commentaire                                                                                                                                              |
|-------------------|--------------------------------|--------------|--------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| DPAE (ex DUE)     | CIRSO                          | 2            | TEXTE        | entre 1 et 5h               | Nouveau : le portail met désormais à disposition un compte rendu au format PDF plus complet en lieu et place du HTML.                                   |
|                   |                                |              | PDF          |                             |                                                                                                                                                          |
| DUCS              | URSSAF                         | 1            | TEXTE        | quelques minutes            |                                                                                                                                                          |
|                   | AGIRC/ARRCO                    | 2            | HTML         | entre 15mins et 2h          | 1. Réception d’un Compte Rendu de Contrôle suite au traitement AGIRC / ARRCO                                                                            |
|                   |                                |              | HTML         | plusieurs jours             | 2. Si CR de contrôle OK, réception d’un Compte Rendu d’Exploitation suite au traitement par l’institution de retraite                                    |
| DADS-U            | POLE-EMPLOI                    | 1            | TEXTE        | entre 30mins et 2h          |                                                                                                                                                          |
|                   | CNAV                           | 1            | HTML         | entre 10 et 30 mins         |                                                                                                                                                          |
|                   | AGIRC/ARRCO                    | 1            | HTML         | entre 10 et 30 mins         |                                                                                                                                                          |
|                   | NET-ENTREPRISES                | 1            | HTML         | entre 10mins et 1h          |                                                                                                                                                          |
| AED               | POLE-EMPLOI                    | 2            | HTML         | entre 10mins et 30mins      | 1. Réception d’un Compte Rendu Applicatif (CRA) indiquant OK / KO                                                                                       |
|                   |                                |              | PDF Zippé    | entre 10mins et 30mins      | 2. Si déclaration OK, réception de l’attestation employeur rematérialisée                                                                               |
| DSN               | NET-ENTREPRISES                | 1            | HTML         | entre 10 et 30 mins         | 1. Réception d’un bilan d’anomalies (ARS négatif = rejet) ou d’un Certificat de Conformité (ARS positif = acceptation)                                 |
|                   | OPS (Destinataires Finaux)     | 0…N          | HTML         | Dépend de l’OPS             | 2. Si Certificat de Conformité reçu de Net-Entreprises (ARS Positif = acceptation), réception de 0 à N CR de la part de(s) OPS destinataire(s) en fonction du type de document déposé |
| TVA               | Portail                        | 1            | EDI          | entre 30s et 5mins          | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                             |
|                   | DGFIP / OGA / CAB              | 1            | EDI          | entre 1h et 5h              | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                        |
| Téléprocédure | Destinataire               | Nombre de CR | Format | Temps de réponse         | Commentaire                                                                                                                                                  |
|---------------|----------------------------|---------------|--------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| REQUETE       | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | DGFIP                      | 1…2           | EDI    | entre 1h et 5h            | 1. Réception d’un INFENT CR indiquant le résultat des contrôles destinataires (ARS)  
                                                                                     2. Si INFENT CR positif, Réception d’un INFENT REPONSE contenant les données demandées (AIS) |
| TDFC          | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | DGFIP / OGA / CAB / ENT / TPE | 1         | EDI    | entre 1h et 5h            | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |
| PAIEMENT      | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | DGFIP / OGA / CAB          | 1             | EDI    | entre 1h et 5h            | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |
| IR            | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | DGFIP / GPA                | 1             | EDI    | entre 1h et 5h            | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |
| DSI           | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | RSI                        | 1             | EDI    | entre 1 et 5 jours        | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |
| DRP           | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | MSA                        | 1             | EDI    | entre 1 et 5 jours        | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |
| OGA           | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | OGA                        | 1             | EDI    | Dépend du destinataire    | 1. Réception d’un INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                         |
|               | CEC / TPE                  | 1…2           | EDI    | Dépend du destinataire    | 2. Si INFENT CR positif, Réception d’une PIELIB REPONSE contenant les pièces demandées (AIS)                                                                |
| PART          | Portail                    | 1             | EDI    | entre 30s et 5 mins       | INFENT CR indiquant le résultat des contrôles portails (ACS)                                                                                                 |
|               | DGFIP                      | 1             | EDI    | entre 24h et 72h          | INFENT CR indiquant le résultat des contrôles destinataires (ARS)                                                                                           |

# Hiérarchie des comptes

➤ Plusieurs niveaux de hiérarchie des comptes = différents niveaux de visualisations / droits

## Structure hiérarchique :

- **ADMINISTRATEUR MB**
  - contrôle l'ensemble de la Marque Blanche

## MARQUE BLANCHE
Contient plusieurs **comptes principaux**, chacun ayant ses **comptes secondaires** :

- **COMPTE PRINCIPAL 1**
  - COMPTE SECONDAIRE 1.1
  - COMPTE SECONDAIRE 1.2

- **COMPTE PRINCIPAL 2**
  - COMPTE SECONDAIRE 2.1
  - COMPTE SECONDAIRE 2.2


DOCUMENTATION API REST
Summary
01/ Introduction
● Glossary
● Environments
● Informations
● Recommendations
02/ Modules
● Authentication
● Account
● Teleprocedure
● Web-Declaration
● Bank Statement
● Archive
● Digital Vault
● Alert / Notification
03/ Test with Swagger UI
● How to get an Access Token ?
● How to refresh a token ?
● How to submit a VAT file ?
● How to check a deposit until declarations are accepted ?
04/ Test with Postman
05/ SOAP / REST matching
Contacts
For commercial information : contact@asp-one.fr
For technical information : dev-aspone@tessi.fr
For user support : hotmel@asp-one.fr
1/ INTRODUCTION
Glossary
● Teleprocedure : Normalized way to process EDI files
● Interchange : File containing declaration(s)
● PED : EDI partner immatriculed by Tax Administration
● ADS : Acknowledgment of deposit
● ACS : Acknowledgment of interchange processing by the portal
● ARS : Acknowledgment of declaration processing by the final recipient
● AIS : Information notice returned by the final recipient
● DGFiP : French Tax Administration
● DLD : Deposit deadline / DLS : Substitution deadline
● OGA : Approved management body
● GPA : Asset Manager
● TDT : Third party declarant
● CEC : Public accountant
● OPS : Social protection agency
● MSA : Agricultural social mutuality
● SAE : Electronic Archiving Sysstem
Environments
RECETTE (= TEST / SANDBOX)
https://recette-aspone.tessitechno.fr/api/rest/swagger/index.html
Account
https://recette-aspone.tessitechno.fr/api/rest/swagger/account.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/account.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/account.yaml
Alert / Notification
https://recette-aspone.tessitechno.fr/api/rest/swagger/alert.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/alert.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/alert.yaml
Archive
https://recette-aspone.tessitechno.fr/api/rest/swagger/archive.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/archive.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/archive.yaml
Authentication
https://recette-aspone.tessitechno.fr/api/rest/swagger/authentication.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/authentication.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/authentication.yaml
Bank Statement
https://recette-aspone.tessitechno.fr/api/rest/swagger/bank_statement.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/bank_statement.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/digital_vault.yaml
Teleprocedure
https://recette-aspone.tessitechno.fr/api/rest/swagger/teleprocedure.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/teleprocedure.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/teleprocedure.yaml
Web-declaration
https://recette-aspone.tessitechno.fr/api/rest/swagger/webdeclaration.html
https://recette-aspone.tessitechno.fr/api/rest/swagger/webdeclaration.json
https://recette-aspone.tessitechno.fr/api/rest/swagger/webdeclaration.yaml
Environments
RECETTE (= TEST / SANDBOX) :
Certain recipients doesn’t return report for TESTS.
| Teleprocedure | Recipient | Reports available in RECETTE | Reports Format | Average Reporting Time |
|––––––––|———–|—————————––|––––––––|———————––|
| TVA            | DGFIP     | YES                           | EDI            | 45mins to 2h            |
|                | OGA / CEC | NO                            |                |                         |
| TDFC           | DGFIP     | YES                           | EDI            | 45mins to 2h            |
|                | OGA / CEC / TDT / ENT / TPE / Banks | NO |          |                         |
| PAIEMENT       | DGFIP     | YES                           | EDI            | 45mins to 2h            |
|                | OGA / CEC | NO                            |                |                         |
| REQUETE        | DGFIP     | YES                           | EDI            | 45mins to 2h            |
| IR             | DGFIP     | YES                           | EDI            | 45mins to 2h            |
|                | GPA       | NO                            |                |                         |
| PART           | DGFIP     | YES                           | EDI            | 24h to 72h
→ Testing period is annual from November 21 to December 21 |
| DADSU          | CI-BTP    |                               | HTML           | 10mins to 1h            |
| DPAE (ex DUE)  | URSSAF    | YES                           | XML, HTML, TEXT, PDF | 15mins to 1h      |
|                | MSA       |                               | TEXT, PDF      | 15mins to 1h            |
|                | NET-ENTREPRISES |                        | XML, HTML      | 10 to 30mins            |
| DSN            | OPS       | NO                            | XML, HTML, PDF |                         |
Environments
PRODUCTION
https://www.aspone.fr/api/rest/swagger/index.html
Account
https://www.aspone.fr/api/rest/swagger/account.html
https://www.aspone.fr/api/rest/swagger/account.json
https://www.aspone.fr/api/rest/swagger/account.yaml
Alert / Notification 
https://www.aspone.fr/api/rest/swagger/alert.html
https://www.aspone.fr/api/rest/swagger/alert.json
https://www.aspone.fr/api/rest/swagger/alert.yaml
Archive
https://www.aspone.fr/api/rest/swagger/archive.html
https://www.aspone.fr/api/rest/swagger/archive.json
https://www.aspone.fr/api/rest/swagger/archive.yaml
Authentication
https://www.aspone.fr/api/rest/swagger/authentication.html
https://www.aspone.fr/api/rest/swagger/authentication.json
https://www.aspone.fr/api/rest/swagger/authentication.yaml
Bank Statement
https://www.aspone.fr/api/rest/swagger/bank_statement.html
https://www.aspone.fr/api/rest/swagger/bank_statement.json
https://www.aspone.fr/api/rest/swagger/bank_statement.yaml
Digital Vault 
https://www.aspone.fr/api/rest/swagger/digital_vault.html
https://www.aspone.fr/api/rest/swagger/digital_vault.json
https://www.aspone.fr/api/rest/swagger/digital_vault.yaml
Teleprocedure
https://www.aspone.fr/api/rest/swagger/teleprocedure.html
https://www.aspone.fr/api/rest/swagger/teleprocedure.json
https://www.aspone.fr/api/rest/swagger/teleprocedure.yaml
Web-declaration
https://www.aspone.fr/api/rest/swagger/webdeclaration.html
https://www.aspone.fr/api/rest/swagger/webdeclaration.json
https://www.aspone.fr/api/rest/swagger/webdeclaration.yaml
Every autonomous white label / portal has its own URL : https://whitelabel.domain/api/rest/*
Informations
Resource ID
All resources are identified by a UUID (Universally Unique Identifier)
Example : 4e9403da-d68f-45ed-8636-94e5eab7555c
Date formats
3 date formats are used :
Date with time precision : YYYY-MM-DDThh:mm:ssTZD

 Europe/Paris local time with indication of the offset from UTC (ISO 8601)
Example : 2024-09-16T09:36:12+02:00
 Date with day precision : YYYY-MM-DD
Example : 2024-09-16
 Date with month precision : YYYY-MM
Example : 2024-09
Informations
Login header param
A « Login » header parameter is available for most methods.
It’s an optional parameter that allows access to a resource as another account.
Access Token must be associated to an account that has the rights on this account.
Example 1 : I’m an admin and want to access a resource as a primary or secondary account.
Example 2 : I’m a primary account and I want to access a resource as one of my secondary account.
👨‍💼 Administrators

Only autonomous white label / portal has its dedicated administrator
An administrator can manage primary and secondary accounts registered on its portal

⬇️

👥 Primary accounts

A primary account can manage its secondary accounts

⬇️

👨‍👩‍👧‍👦 Secondary accounts
Recommendations
Updating resource
When updating a resource is permitted with a PUT method, we expect the full representation of the resource.
Fields not provided will be overwritten with null or default value
(except for 'password’ on accounts that must be provided only to change it)
So, to update a resource, we advice to first GET the full representation, modify attributes you want to change and then PUT the resource back to the server.
Searching resource
Search requests are POST because it is more convenient to handle complex criteria (like list) in forms.
Search responses are paginated for performance reason :
{
"total": 110,
"count": 50,
"limit": 50,
"start": 30,
"links": {
"next": "https://recette-aspone.tessitechno.fr/api/rest/v1/teleprocedure/declarations/sent/search?limit=50&start=80&sortDirection=DESC&sortField=DEPOSIT_DATE",
"prev": "https://recette-aspone.tessitechno.fr/api/rest/v1/teleprocedure/declarations/sent/search?limit=50&start=0&sortDirection=DESC&sortField=DEPOSIT_DATE",
"self": "https://recette-aspone.tessitechno.fr/api/rest/v1/teleprocedure/declarations/sent/search?limit=50&start=30&sortDirection=DESC&sortField=DEPOSIT_DATE"
},
…
}
Recommendations
Versioning
A versioning system is provided since each API route is prefixed with a version number (“v1” for now).
We intend to increment this version number only if compatibility is broken for a given method.
We recommend that you develop your client side application in such a way that adding new requests, adding
new optional parameters in existing requests and new attributes in existing responses does not prevent it
from functioning.
Rate limiting
We intend to set up a rate limiting mechanism in order to prevent flooding.
Please do not flood our server with an excessive number of requests.
For your information, deposit processing times are :
- By the portal : few minutes
- By the final recipient : few hours
So it is counter productive, to check every minute the state of a declaration !
2.1/ AUTHENTICATION
 First thing you have to do is to get an Access Token 
POST tokens/access
Use Basic Authorization with an admin or a client account credentials
Username = [PORTAL\]LOGIN
PORTAL is optional in username, it must be provided for non autonomous one.
 First thing you have to do is to get an Access Token
❑ Request
Authorization HTTP header looks like :
Basic Base64(username:password)
Example for username=usrdemo and password=123456 : Basic dXNyZGVtbzoxMjM0NTY=
❑ Response
Response contains an Access Token valid for 1 hour and a Refresh Token valid for 7 days.
POST tokens/refresh
You can get another Access Token using the Refresh Token.
❑ Request
Authorization HTTP header looks like :
021b50a5ccb78e4eb99020fc45b1220519926c33b140d07cfffe2661642a43f2
❑ Response
Response contains a new Access Token and a new Refresh Token.
Use Access Token (prefixed with « Bearer ») in authorization header for all other API methods.
2.2/ ACCOUNT
ADMINS
CLIENTS
You can create / update / search / read client accounts (primary or secondary).
Only an admin can create primary account.
You can update / search / read admin accounts.
Only our super-admin can create admin account.
ALERTS
You can create / update / read configuration of email notifications on teleprocedure.
2.3/ TELEPROCEDURE
✅ Teleprocedure

🟦 DEPOSITS

🔹 POST /v1/teleprocedure/deposits — File deposit

You can submit interchange(s) containing declaration(s) on a teleprocedure.

✅ Accepted formats : EDI, XML or ZIP
⚠️ Max 10 Mo and 100 files in ZIP

In the response, you get a depositId.

⸻

🔹 GET /v1/teleprocedure/deposits/{depositId} — Get deposit by ID

When the deposit is processed, you get a list of interchangeIds :
{
  "depositId": "7b50d448-8530-4023-bbdb-8c104da8adff",
  "depositDate": "2024-09-05T11:24:31+02:00",
  "subject": "Test Dépôt",
  "type": "ZIP",
  "method": "API_REST",
  "tradOnly": false,
  "adsDate": 56379,
  "adsNumber": "2024-09-05T11:24:33+02:00",
  "depositor": { ... },
  "interchangeIds": [
    "855cd818-ed20-4be7-9890-6b067f89caed",
    "50361544-721c-5618-849f-02cfc81df15f"
  ]
}
⚠️ Then you must check the state of each interchange.
✅ Teleprocedure

🟦 INTERCHANGES

🔹 GET /v1/teleprocedure/interchanges/{interchangeId} — Get interchange by ID

When an interchange is processed, you get a list of declarationIds and states among other metadata:
{
  "interchangeId": "855cd818-ed20-4be7-9890-6b067f89caed",
  "teleprocedure": "TVA",
  "test": true,
  "version": "TDT-PED-IN-TV2401",
  "software": { ... },
  "deposit": { ... },
  "declarationIds": [
    "f972a01a-a393-489a-9fbe-0220b8524014",
    "0948693e-ed96-47b6-99b6-41ef7db30f97",
    "de8534bf-e5fa-4f88-9d54-d45baf9e286b"
  ],
  "states": [
    {
      "date": "2023-12-14T15:27:35+01:00",
      "name": "TRANSLATED_OK",
      "label": "Contrôle syntaxique de l’interchange",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    },
    ...
  ]
}
⚠️ Then you must check the state of each declaration.
✅ States are displayed in chronological descendant order (so current state is the first).
✅ Teleprocedure

🟦 INTERCHANGES

❌ If interchange is invalid, you get details on error state :
"states": [
  {
    "date": "2023-07-31T15:46:16+02:00",
    "name": "TRANSLATED_KO",
    "label": "Echec du contrôle syntaxique de l’interchange",
    "issuer": "PORTAL",
    "type": "ERROR",
    "final": true,
    "details": [
      {
        "date": "2023-07-31T15:46:16+02:00",
        "label": "Erreur générale sur l’interchange",
        "type": "ERROR",
        "detail": "Fichier EDI non valide : la version TDT-PED-IN-TD2201 n’est pas autorisée en TEST pour la téléprocédure TDFC"
      }
    ]
  },
  {
    "date": "2023-07-31T15:46:15+02:00",
    "name": "TRANSLATION_PENDING",
    "label": "Soumission de l’interchange pour traitements EDI",
    "issuer": "PORTAL",
    "type": "SUCCESS",
    "final": false,
    "details": null
  }
]
⚠️ Then you must correct it and resubmit the interchange.
✅ Teleprocedure

🟦 DECLARATIONS

🔹 GET /v1/teleprocedure/declarations/{declarationId} — Get declaration by ID

When a declaration is processed, you get a list of states among other metadata:
{
  "declarationId": "6f3c8b11-7174-4ac3-8092-d6d1c7e2c602",
  "states": [
    {
      "date": "2023-04-11T14:59:45+02:00",
      "name": "SENT",
      "label": "Routage de la déclaration vers le destinataire",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    },
    {
      "date": "2023-04-11T14:59:44+02:00",
      "name": "TRANSLATED_OK",
      "label": "Contrôles syntaxique et sémantique de la déclaration",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    }
  ]
}
✅ States are displayed in chronological descendant order (so current state is the first).
⚠️ As long as the current state is not final, you must try again later.
✅ Teleprocedure

🟦 DECLARATIONS

✅ When a declaration is accepted by the final recipient, you get a FINAL SUCCESS state :
"states": [
  {
    "date": "2024-09-04T10:36:50+02:00",
    "name": "ACCEPTED_BY_RECIPIENT",
    "label": "Compte-rendu du destinataire positif",
    "issuer": "RECIPIENT",
    "type": "SUCCESS",
    "final": true,
    "details": [
      {
        "date": "2024-09-04T10:36:50+02:00",
        "label": "Liasse fiscale acceptée",
        "type": "SUCCESS",
        "detail": null
      }
    ]
  }
]
✅ This is the end of processing, you have nothing else to do.
✅ Teleprocedure

🟦 DECLARATIONS

❌ When a declaration is rejected by the portal or the final recipient, you get a FINAL ERROR state :
"states": [
  {
    "date": "2024-09-04T12:06:00+01:00",
    "name": "REJECTED_BY_RECIPIENT",
    "label": "Compte-rendu du destinataire négatif",
    "issuer": "RECIPIENT",
    "type": "ERROR",
    "final": true,
    "details": [
      {
        "date": "2024-09-04T12:06:00+01:00",
        "label": "Information retournée par le destinataire",
        "type": "INFORMATION",
        "detail": "La Référence d’Obligation Fiscale (ROF) connue du destinataire pour ce dossier est : TVA2"
      },
      {
        "date": "2024-09-04T12:06:00+01:00",
        "label": "Déclaration TVA et télé règlements rejetés",
        "type": "ERROR",
        "detail": "Obligation fiscale TVA non trouvée pour la référence de l'obligation fiscale déclarée. Code erreur : 175."
      }
    ]
  }
]
⚠️ Then you must correct it and resubmit the declaration.
✅ Teleprocedure

🟦 DECLARATIONS

🔶 Deprecated Endpoints
POST /v1/teleprocedure/declarations/received/search   # Search received declarations
POST /v1/teleprocedure/declarations/sent/search       # Search sent declarations
⚠️ v1 is deprecated because it returns generic results :
Some teleprocedure-specific data may be missing (e.g. spi for IR or payment info for TVA).
✅ Use v2 instead.
✅ Recommended Endpoints (v2)
POST /v2/teleprocedure/declarations/received/search   # Search received declarations (teleprocedure specific results)
POST /v2/teleprocedure/declarations/sent/search       # Search sent declarations (teleprocedure specific results)
🔽 File Retrieval Example

For example, if you are an OGA, you can search received declarations, then list associated EDI file and download it:
GET /v1/teleprocedure/declarations/{declarationId}/files     # List declaration files

GET /v1/files/{fileId}/contents                               # File download
✅ Teleprocedure

🟦 DECLARATIONS

🔹 GET /v1/teleprocedure/declarations/{declarationId}/certificate — Download PDF certificate

For accepted Tax Administration (DGFiP) declarations, you can download a PDF certificate :

Extrait de certificat (exemple visuel) :
Certificat télédéclaratif : Déclaration TVA

Informations relatives à la déclaration :
----------------------------------------------------
Déposant              : COMPTE ASP1ENT (asp1ent)
Date de réception     : 20/03/2024 à 10:44:48
Objet du dépôt        : Test API 20/03
Numéro ADS            : 142865
Identifiant client    : INFENT0000000003563-0-0
Identifiant portail   : INFENT2024032010445146718C9
N° groupement portail : 92100074901102
Type                  : Déclaration TVA
✅ Teleprocedure

🟦 REPORTS

If you want to parse yourself EDI reports generated:
	•	by the portal → ACS attachment
	•	by the final recipient → ARS / AIS attachment

You can download them:
GET /v1/teleprocedure/interchanges/{interchangeId}/reports     # List interchange reports

GET /v1/teleprocedure/declarations/{declarationId}/reports     # List declaration reports
Or search them by criteria:
POST /v1/teleprocedure/reports/search                          # Search report
✅ Teleprocedure

🟦 In summary : monitoring a deposit
	1.	POST /v1/teleprocedure/deposits
➜ Create a new deposit
	2.	GET /v1/teleprocedure/deposits/{depositId}
➜ Retrieve deposit info
	3.	For each Interchange
→ GET /v1/teleprocedure/interchanges/{interchangeId}
➜ Retrieve interchanges
	4.	For each Declaration
→ GET /v1/teleprocedure/declarations/{declarationId}
➜ Retrieve declaration info
	5.	Reports (optional — only if you want to parse reports yourself):
	•	GET /v1/teleprocedure/declarations/{declarationId}/reports
➜ Get reports by declaration ID
OR
	•	POST /v1/teleprocedure/reports/search
➜ Search reports by date range
🟡 Useful in particular for DSN when the number of OPS reports is unknown in advance.
2.4/ WEB-DECLARATION
✅ DECLARTATIONS

Please contact us to get our XML-EDI format specifications : contact@asp-one.fr

🟢 Webdeclaration Import
POST /v1/web/declarations     # Inject data in webdeclarations forms
✅ Accepted formats : XML or ZIP file containing XML and possibly one other file (accounting balance CSV)
⚠️ Max 1 Mo and 2 files in ZIP

⸻

🔍 Get a Webdeclaration
GET /v1/web/declarations/{webdeclarationId}     # Get webdeclaration by ID
When the webdeclaration is manually submitted by the user, a depositId is provided:
{
  "webdeclarationId": "64076752-d618-5fac-926b-14147939c059",
  "teleprocedure": "WEB_TDFC",
  "declarationType": "IDF",
  "state": "SUBMITTED",
  "creationMode": "IMPORT",
  "creationDate": "2023-11-07T17:44:00+01:00",
  "updateDate": "2023-11-07T17:45:20+01:00",
  "submittedDate": "2023-11-07T17:45:20+01:00",
  "depositId": "f1f4637d-cffe-48f4-a937-9f7c1f7144e9"
}
⚠️ Until the user completes web forms online,
the state remains PENDING and depositId is null.

✅ When webdeclaration is submitted, it becomes a traditional deposit.
See teleprocedure section to know how to proceed.
✅ Web-Declaration

🟦 In summary: monitoring a webdeclaration
	1.	POST /v1/web/declarations
➜ Inject data in webdeclaration form
	2.	GET /v1/web/declarations/{webdeclarationId}
➜ Retrieve webdeclaration (before submission)
→ After user submits manually →
	3.	GET /v1/teleprocedure/deposits/{depositId}
➜ Retrieve generated deposit
	4.	GET /v1/teleprocedure/interchanges/{interchangeId}
➜ For each interchange
	5.	GET /v1/teleprocedure/declarations/{declarationId}
➜ For each declaration
	6.	GET /v1/teleprocedure/declarations/{declarationId}/reports
➜ [Optional] If you want to parse reports yourself
2.5/ BANK STATEMENT
For now, only bank statement reception is provided on the REST API.

⚠️ Bank accounts configuration can only be parameterized on the website.

⸻

🔍 Search bank statements
POST /v1/bank/statements/search     # Search received bank statements
📥 Download CFONB120 file
GET /v1/files/{fileId}/contents     # File download
🗑️ Deleted transactions (not in CFONB120)

⚠️ As deleted transactions cannot be pushed in CFONB120 file, you can get them in JSON or CSV format :
GET /v1/bank/statements/{statementId}/transactions/deleted       # Get deleted transactions (JSON)

GET /v1/bank/statements/{statementId}/transactions/deleted/csv   # Download deleted transactions (CSV)
2.6/ ARCHIVE
🗃️ Archive

You can access legal archiving in our electronic archiving system (SAE) to view:
	•	🗓️ 10 years archives for:
	•	declarations
	•	DSN param
	•	BPIJ sheets
	•	🗓️ 5 years archives for:
	•	bank statements

⸻

🟦 SEARCH

You can search archives by criteria:
POST /v1/archive/declarations/search     # Archived declarations search
Then you can download a ZIP file containing all elements related to an archive:
GET /v1/archive/declarations/{archiveId}/contents     # Download ZIP archive
🗃️ Archive (suite)

🟦 DOCUMENTS

You can list all documents related to an archive and download them individually:
GET /v1/archive/declarations/{archiveId}/documents                     # List archived declaration documents

GET /v1/archive/declarations/{archiveId}/documents/{documentId}/contents   # Get archived document content
🟦 EVENTS

You can list all events related to an archive:
GET /v1/archive/declarations/{archiveId}/events     # List archived declaration events
⚠️ A client can view only BUSINESS events.
⚠️ An admin can view both BUSINESS and SYSTEM events.*
* Document creation / read / update / delete events in SAE
2.7/ DIGITAL VAULT
🗄️ Digital Vault

You can store and share documents in a secured digital vault.

⸻

🟦 CONTRACTS

First thing to do is to identify which contract corresponds to your needs depending on the quantity (number and size) of documents you wish to store.
GET /v1/vault/contracts                     # List contracts

GET /v1/vault/contracts/{contractId}        # Get contract by ID
📄 Example of response:
{
  "contractId": "42019615-eadb-573c-9593-c2fbab9d9366",
  "accountType": "COMPANY",
  "accountProfile": "PREMIUM",
  "label": "CFN Premium",
  "quotaFiles": 1000,             // total number of files accepted
  "quotaSize": "1 GB",            // total size accepted
  "price": 169.0,
  "quantityMax": 10,              // max subscriptions to this contract
  "enabled": true,
  "delegation": true,             // whether sharing is possible
  "subaccountWithMailbox": true,
  "subaccountWithoutMailbox": false,
  "default": false
}
🟡 For example: If I subscribe to this contract for a quantity of 2,
I can store up to 2000 files / 2 GB
🗄️ Digital Vault

🟦 SUBSCRIPTIONS

Then you can subscribe to digital vault by indicating the chosen contract / quantity.
POST /v1/vault/subscriptions                       # Create subscription

POST /v1/vault/subscriptions/search                # Search subscriptions

GET  /v1/vault/subscriptions/{subscriptionId}      # Get subscription by ID

PUT  /v1/vault/subscriptions/{subscriptionId}      # Update subscription
📄 Example of response:
{
  "subscriptionId": "63071138-374d-58e8-8069-5ddca51ca723",
  "contractId": "7033b501-87e6-510d-8999-07fd8d3b904c",
  "contractQuantity": 1,
  "enabled": true,      // boolean: subscription is enabled
  "terms": true,        // boolean: terms & conditions accepted
  "activationDate": "2024-12-31T10:27:19+01:00",
  "deactivationDate": null,
  "quota": {
    "usedSize": "122 KB",     // actual size used
    "usedFiles": 8,           // actual number of files
    "maxSize": "10 MB",       // maximum size allowed
    "maxFiles": 10            // maximum number of files allowed
  }
}
🗄️ Digital Vault

🟦 DOCUMENTS

⚠️ A document can be a folder or a file.

⸻

📥 Drop / Download files
POST /v1/vault/documents/files                          # File deposit

GET  /v1/vault/documents/files/{fileId}/contents        # Download file content
📁 Create folders to organize your files
POST /v1/vault/documents/folders                        # Create folder

GET  /v1/vault/documents/folders/{folderId}/documents   # List folder documents
📝 Read / Update / Delete a document
GET    /v1/vault/documents/{documentId}                 # Get document by ID

PUT    /v1/vault/documents/{documentId}                 # Update document

DELETE /v1/vault/documents/{documentId}                 # Delete document
🗄️ Digital Vault

🟦 SEARCH documents by criteria
POST /v1/vault/documents/search     # Search documents
📄 Example of request body:
{
  "depositStartDate": "2025-01-01T00:00:00+01:00",   // lower limit of deposit date
  "depositEndDate": "2025-02-01T23:59:59+01:00",     // upper limit of deposit date
  "type": "FILE",                                    // document type: FILE or FOLDER
  "nbDaysExpiration": 90,                            // number of days before expiration/deletion
  "keywords": "societe test",                        // keywords or part of name
  "owner": "userdemo"                                // login of the owner
}
📌 List events & shares for a document
GET /v1/vault/documents/{documentId}/events     # List document events

GET /v1/vault/documents/{documentId}/shares     # List document shares
🗄️ Digital Vault

🟦 EVENTS

⚠️ All document actions are logged and can be retrieved as events.

We provide a search request in order to find events by criteria:
POST /v1/vault/events/search     # Search events
❗ For performance reasons, we strongly recommend listing events related to a document using the dedicated route:
GET /v1/vault/documents/{documentId}/events     # List document events
🗄️ Digital Vault

🟦 SHARES
	•	You can share a file with a third party → DOWNLOAD
	•	You can ask a third party to drop a file in a folder → UPLOAD
 POST /v1/vault/shares     # Create share
⚠️ In both cases, the third party receives an email with a secure link valid for 72 hours.
🗄️ Digital Vault

🟦 DOWNLOAD SHARE – Example

🔹 POST creation request :
{
  "shareId": null,
  "documentId": "5f7a9f4f-c78c-4c0a-aab2-d2a57c45b1df",  // ID of the file you want to share
  "type": "DOWNLOAD",
  "creationDate": null,
  "expirationDate": null,
  "recipient": "third.party@test.fr",                  // email of the recipient
  "message": null,
  "lastUsedDate": null,
  "nbUses": null,
  "active": null,
  "url": null,
  "issuer": null
}
📩 What the third-party recipient receives :

Coffre-Fort Numérique – Fichier mis à disposition par EXPERT COMPTABLE TEST

Email message example :
Bonjour,
Monsieur Martin DUPOND de la société EXPERT COMPTABLE TEST a mis à votre disposition le document NOUVEAU_CONTRAT.PDF

Vous pouvez le télécharger sur le portail ASPONE via le lien sécurisé suivant
(valide seulement durant les 72 prochaines heures) :

https://www.aspone.fr/…token=b5dd4f75fc8242e1452ae344276f5a7c163a9af68c94d80e52bf3f2ad5e2

Cordialement,
🗄️ Digital Vault

🟦 UPLOAD SHARE – Example

🔹 POST creation request :
{
  "shareId": null,
  "documentId": "016bd0c7-4dc6-483c-a8dc-093a96483d95",  // id of the target folder
  "type": "UPLOAD",
  "creationDate": null,
  "expirationDate": null,
  "recipient": "thomas.brun@tessi.fr",                   // email of the recipient
  "message": "Merci de nous fournir les factures dont nous avons parlé au téléphone ce matin.", // message
  "lastUsedDate": null,
  "nbUses": null,
  "active": null,
  "url": null,
  "issuer": null
}
📩 What the third-party recipient receives :

Coffre-Fort Numérique – Demande de fichier par EXPERT COMPTABLE TEST

Email message example :
Bonjour,
Monsieur Martin DUPOND de la société EXPERT COMPTABLE TEST vous invite à déposer un document dans son Coffre-Fort Numérique :

Merci de nous fournir les factures dont nous avons parlé au téléphone ce matin.

Veuillez trouver ci-dessous un lien sécurisé vous permettant d’accéder à la page de dépôt sur le portail ASPONE
(valide seulement durant les 72 prochaines heures) :

https://www.aspone.fr/espaceprive/temp/cfn/upload.do?uuid=…

Cordialement,
2.8/ ALERT / NOTIFICATION
🔔 Alert / Notification

You can manage and customize email notifications.

⸻

🟦 PROFILES

Profiles allow you to customize email notifications (font, color, logo, header, footer, etc.)
POST /v1/alert/profiles/search               # Search alert profiles (Admin only)

GET  /v1/alert/profiles/{alertProfileId}     # Get alert profile by ID (Admin only)
📄 Example of profile:
{
  "alertProfileId": "803c0471-2d32-51f0-9063-160c8e0f303e",
  "alertTemplateId": "51013871-42d1-56ca-a555-d588baf2cf40",
  "portal": "SOCIETE_TEST",
  "code": "PERSO_1",
  "label": "Profil personnalisé n°1",
  "enabled": true,
  "nbUsers": 15,                     // number of users to whom the profile is assigned
  "creationDate": "2025-06-23T08:10:38+01:00",
  "default": true                   // default profiles apply to users without a specific one
}
⚠️ Currently, profile creation / editing / deleting is only available on the website.
03/ TEST WITH SWAGGER UI
🧩 Swagger UI

Swagger UI allows development teams to visualize and interact with the API’s resources without having any of the implementation logic in place.

⸻

🧪 TEST Environment Access

You can access Swagger UI here:

🔗 https://recette-aspone.tessitechno.fr/api/rest/swagger/index.html

⸻

🔐 AUTHENTICATION

Base URL : https://recette-aspone.tessitechno.fr/api/rest

🔹 TOKENS
POST /v1/authentication/tokens/access      # Create new access token from user credentials

POST /v1/authentication/tokens/refresh     # Create new access token from refresh token
🧩 Swagger UI / Access Token (1/2)

🟦 How to get an Access Token ?

Click on the padlock 🔒, type your username and password, then:
	1.	Click on “Authorize”
	2.	Then click on “Try it out”
	3.	And finally “Execute”

⸻

🔹 Endpoint to call:
POST /v1/authentication/tokens/access     # Create new access token from user credentials
This uses Basic Authentication.
PORTAL is optional in username, but required for non-autonomous portals.
✅ Successful Response (HTTP 200)
{
  "token": "string",
  "refreshToken": "string",
  "tokenExpirationDate": "2024-09-05T14:48:04.057Z",
  "refreshTokenExpirationDate": "2024-09-05T14:48:04.057Z"
}
🧩 Swagger UI / Access Token (2/2)

🟩 In response, you get an Access Token and a Refresh Token with their expiration dates :

✅ Example server response (HTTP 200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQT1JUQUxMX0FUTUE90RSTSImp0aSI6IjhlZTZjMDE0LWZiZmQtNG0K0si1iZTllLWxzZjYyNTE1M2I3YSI... (truncated)",
  "refreshToken": "3a2a023a220f982a64cd91d47b4e8d77b0f5433aadf81df1755ace202d4e",
  "tokenExpirationDate": "2024-09-05T18:11:38+02:00",
  "refreshTokenExpirationDate": "2024-09-12T17:11:39+02:00"
}
🧩 Swagger UI / Refresh Token (1/2)

🟦 How to refresh a token ?
	1.	Click on the padlock 🔒
	2.	Enter your refresh token
	3.	Click on Authorize
	4.	Then click on Try it out
	5.	And finally Execute

⸻

🔹 Endpoint to call:
POST /v1/authentication/tokens/refresh     # Create new access token from refresh token
🔁 A refresh token can only be used once.

⸻

🧾 Header authorization:

Authorization (type: apiKey)
Value: Your refresh token
In: header
🧩 Swagger UI / Refresh Token (2/2)

🟢 In response, you get a new Access Token and a new Refresh Token :

✅ Example response (HTTP 200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBU1BP... (truncated)",
  "refreshToken": "6a61bac83ed904d69f1e002390cc02d182cec02f855d58b514c3606030922b16",
  "tokenExpirationDate": "2024-09-06T12:53:40+02:00",
  "refreshTokenExpirationDate": "2024-09-13T11:53:40+02:00"
}
⚠️ For security reasons, a Refresh Token can be used only once.
🧩 Swagger UI / Submit VAT file (1/2)

🟦 How to submit a VAT file ?
	1.	Click on the padlock 🔒
	2.	Paste your Access Token (prefixed with Bearer)
	3.	Click on Authorize
	4.	Then click on Try it out
	5.	Fill in the required parameters
	6.	Click on Execute

⸻

🔹 Endpoint:
POST /v1/teleprocedure/deposits     # File deposit (EDI / XML / ZIP)
📝 Example parameters:
### Parameters table for VAT file submission

| Name          | Type      | Description                                | Value            |
|---------------|-----------|--------------------------------------------|------------------|
| login         | header    | Account login for resource access          | VAT Deposit Test |
| subject       | formData  | Subject of the deposit                     | VAT Deposit Test |
| teleprocedure | formData  | Teleprocedure name                         | TVA              |
| tradOnly      | formData  | `true`/`false` (translation only mode)     | false            |
| filename      | formData  | File name                                  | TVA_3310CA3.edi  |
| content       | file      | Upload the EDI/XML file                    | TVA_3310CA3.edi  |
## 🧩 Swagger UI / Submit VAT file (2/2)

### ✅ In response, you get a `depositId` :

#### HTTP 202 Response (Accepted – Asynchronous Processing)
45487303-e0e2-45cd-9649-b3d25c51ab3e
> ⚠️ At this stage, the deposit hasn’t been processed by the server.  
> It will be processed **asynchronously** for performance reasons.
## 🧩 Swagger UI / Check declaration state (1/7)

### 🟦 How to check a deposit until declarations are accepted ?

First of all, you must get deposit detail using the `depositId` provided previously.

### 🔹 Endpoint:

GET /v1/teleprocedure/deposits/{depositId}     # Get deposit by ID

### 📥 Parameters:

| Name       | Type    | Description                                | Example                                |
|------------|---------|--------------------------------------------|----------------------------------------|
| login      | header  | Account login for which you want access    | login                                   |
| depositId  | path    | ID of the deposit to retrieve              | 45487303-e0e2-45cd-9649-b3d25c51ab3e    |
## 🧩 Swagger UI / Check declaration state (2/7)

### 🟩 In response, you get metadata of the deposit and a list of `interchangeIds` :

#### ✅ Example response (HTTP 200)

```json
{
  "depositId": "45487303-e0e2-45cd-9649-b3d25c51ab3e",
  "depositDate": "2024-09-06T11:09:02+02:00",
  "subject": "VAT Deposit Test",
  "type": "EDI",
  "method": "API_REST",
  "tradOnly": false,
  "adsDate": "2024-09-06T11:09:02+02:00",
  "adsNumber": "56457",
  "depositor": {
    "clientAccountId": "50361544-721c-5618-849f-02cfc81df15f",
    "portal": "ASPONE",
    "login": "brunol",
    "label": "COMPTE TEST DEV",
    "type": "THIRD_PARTY_DECLARANT",
    "role": "PRIMARY_ACCOUNT"
  },
  "test": true,
  "interchangeIds": [
    "8b6ea052-c766-464a-b0de-89fe8ddec7cb"
  ]
}
⚠️ Then you must check the state of each interchange.
## 🧩 Swagger UI / Check declaration state (3/7)

### 🔍 Then, you must check the state of each `interchange` :

### 🔹 Endpoint:

GET /v1/teleprocedure/interchanges/{interchangeId}     # Get interchange by ID

### 📥 Parameters:

| Name           | Type    | Description                                 | Example                                 |
|----------------|---------|---------------------------------------------|-----------------------------------------|
| login          | header  | Account login for which you want to access  | login                                   |
| interchangeId  | path    | ID of the interchange to check              | 8b6ea052-c766-464a-b0de-89fe8ddec7cb    |
## 🧩 Swagger UI / Check declaration state (4/7)

### 🟦 In response, you get:
- Metadata of the interchange
- A **list of `declarationIds`**
- A **history of states**

### ✅ Example response (HTTP 200)

```json
{
  "declarationIds": [
    "641dc433-55fb-469b-84ec-42b4b876e25a",
    "1959c35d-21ca-433c-b258-e6f10abf913f"
  ],
  "states": [
    {
      "date": "2024-09-06T11:09:09+02:00",
      "name": "TRANSLATED_OK",
      "label": "Contrôle syntaxique de l’interchange",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    },
    {
      "date": "2024-09-06T11:09:05+02:00",
      "name": "TRANSLATION_PENDING",
      "label": "Soumission de l’interchange pour traitements EDI",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    },
    {
      "date": "2024-09-06T11:09:02+02:00",
      "name": "DEPOSED",
      "label": "Dépôt de l’interchange sur le portail",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    }
  ]
}
ℹ️ Notes :
	•	🔵 States are displayed in descending chronological order (current state is first).
	•	❌ If interchange is KO, you’ll get a FINAL ERROR state with details.
→ You must correct and resubmit the interchange.
	•	⚠️ If interchange is OK, you must check the state of each declaration.
## 🧩 Swagger UI / Check declaration state (6/7)

### 🟦 In response, you get:
- Metadata of the declaration
- A **history of states**

### ✅ Example response (HTTP 200)

```json
{
  "label": "Déclaration TVA",
  "periodStartDate": "2024-01-01",
  "periodEndDate": "2024-01-31",
  "referenceClient": "INFENT000000003563-0-0",
  "referencePortal": "INFENT20240906110908AD95B11",
  "referenceCommon": null,
  "waitForCR": true,
  "states": [
    {
      "date": "2024-09-06T11:11:56+02:00",
      "name": "SENT",
      "label": "Routage de la déclaration vers le destinataire",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    },
    {
      "date": "2024-09-06T11:09:09+02:00",
      "name": "TRANSLATED_OK",
      "label": "Contrôles syntaxique et sémantique de la déclaration",
      "issuer": "PORTAL",
      "type": "SUCCESS",
      "final": false,
      "details": null
    }
  ]
}
ℹ️ Notes :
	•	🔵 States are displayed in descending chronological order (latest first).
	•	⚠️ If current state is not FINAL, you must try again later.
	•	❌ If declaration is KO, you get a FINAL ERROR state with details.
→ You must correct and resubmit the declaration.
	•	✅ If declaration is OK, you get a FINAL SUCCESS state.
## 🧩 Swagger UI / Check declaration state (7/7)

### ⚠️ Be careful for VAT or other declarations containing **payment**:
A declaration can be accepted by the final recipient while the **payment is rejected**, or vice versa.  
➡️ You must **check the payment state**.

---

### ✅ Example response (HTTP 200)

```json
{
  "paymentList": {
    "total": 1,
    "amount": 262688,
    "payments": [
      {
        "index": 1,
        "amount": 262688,
        "currency": "EUR",
        "iban": {
          "iban": "FR7611112222333333333391",
          "bic": "CEPBFRPPXXX"
        },
        "reference": "TVA1-022024-3310CA3",
        "type": "ORDER",
        "state": {
          "date": "2024-09-06T11:11:56+02:00",
          "name": "SENT",
          "label": "Routage de la déclaration vers le destinataire",
          "issuer": "PORTAL",
          "type": "SUCCESS",
          "final": false
        }
      }
    ]
  }
}
ℹ️ Notes:
	•	🔶 If current state is not FINAL, you must try again later.
	•	❌ If payment is KO, you get a FINAL ERROR state with details.
→ You must correct and resubmit the declaration.
	•	✅ If payment is OK, you get a FINAL SUCCESS state.

⸻

🔁 To resubmit a declaration containing payment, you must take into account the DLS / DLD concept:
UTILISER LA DATE LIMITE DE SUBSTITUTION EN QUATRE LEÇONS FACILES 
## 1. LEÇON 1 : QUELLES SONT LES TÉLÉPROCEDURES CONCERNÉES PAR UNE DATE LIMITE DE SUBSTITUTION ?

La date limite de substitution (DLS) existe pour les téléprocédures suivantes :
- déclaration et paiement de la TVA¹ en mode EDI ;
- paiement de l’impôt sur les sociétés, de la taxe sur les salaires et de la cotisation sur la valeur ajoutée des entreprises et des effectifs salariés en mode EDI.

Cette date n’existe donc pas actuellement pour les procédures en mode EFI (procédures en ligne sur internet).

La date limite de substitution, comme la date limite de dépôt, est appréciée par rapport à la date de réception de la transmission par la DGFiP. Il est donc important de tenir compte du délai de transmission par le partenaire EDI à la DGFiP pour l’utilisateur des procédures EDI.

Dans le compte rendu qui vous est fourni par votre partenaire EDI, c’est la **DATE DE TRANSMISSION DU DEPOT A LA DGFiP** qui vous permettra de savoir si votre dépôt est considéré comme transmis avant la DLS ou après la DLS.
La DLS ne s’applique pas aux demandes de remboursement de crédit de TVA. 
## 2. LEÇON 2 : A QUOI SERT LA DATE LIMITE DE SUBSTITUTION ?

La date limite de substitution, comme son nom l’indique, est la date située trois jours avant la date limite de dépôt jusqu’à laquelle un dépôt peut se substituer à un autre dans les téléprocédures concernées.

Quand un dépôt se substitue à un autre, il le remplace intégralement dans tous ses composants, à savoir :
- toute déclaration ou bordereau antérieur est remplacé par la déclaration ou le bordereau le plus récent transmis avant DLS ;
- tout paiement ou absence de paiement antérieur est remplacé par le paiement ou l’absence de paiement associé à la déclaration ou au bordereau le plus récent transmis avant DLS.

Le paiement du dernier dépôt avant DLS est toujours celui qui est pris en compte. Si le dernier dépôt avant DLS ne contient pas de paiement, tous les paiements antérieurs seront annulés.

Tous les dépôts transmis après la DLS se cumulent entre eux et avec le dernier dépôt transmis avant DLS :
- les déclarations ou bordereaux sont considérés comme successifs et rectificatifs, le dernier document reçu étant celui à prendre en compte ;
- les paiements transmis dans les dépôts après DLS et dans le dernier dépôt avant DLS seront tous pris en compte.

Un dépôt rejeté en totalité (déclaration et paiement) n’est pas pris en compte, ni avant ni après DLS. Un dépôt peut toutefois voir sa déclaration rejetée et son paiement accepté. Dans ce cas, le paiement seul sera pris en compte pour la DLS : les paiements antérieurs seront ignorés, mais pas les déclarations.
## 3. LEÇON 3 : COMMENT CALCULER LA DATE LIMITE DE SUBSTITUTION ?

La date limite de substitution (DLS) est calculée à partir de la date limite de dépôt (DLD), dite également date d’échéance. Elle est égale à DLD – 3 jours.

🚨 La DLS est calculée à partir de la date d’échéance réelle. Lorsque la date d’échéance théorique tombe un jour férié ou un week-end, celle-ci est décalée au 1er jour ouvré suivant.

**Exemple** : date d’échéance théorique le dimanche 24 mars, date d’échéance réelle (DLD) reportée au lundi 25 mars, date limite de substitution le vendredi 22 mars.

🚨 Une fois la DLD fixée, le calcul aboutissant à la fixation de la DLS ne tient compte ni des week-end, ni des jours fériés. Le fait qu’un jour de ce type figure dans les trois jours du calcul ou que, suite à ce calcul, la DLS tombe un week-end ou un jour férié n’a aucun impact sur la fixation de la DLS.

**Exemples** :
- DLD fixée au lundi 24 avril, DLS fixée au vendredi 21 avril.  
- DLD fixée au mercredi 19 février, DLS fixée au dimanche 16 février.
## 4. LEÇON 4 : COMMENT S’APPLIQUE LA DATE LIMITE DE SUBSTITUTION (CAS PRATIQUES) ?

### Cas n° 1
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B – Paiement B = 200 €
- DEPÔT C : Décla C – Paiement C = 100 €
- DEPÔT D : Décla D – Paiement D = 300 €
- DEPÔT E : Décla E – Paiement E = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | NON                          | NON                                     | 0 €                                 |
| B     | NON                          | NON                                     | 0 €                                 |
| C     | OUI (mais rectifiée)         | OUI                                     | 100 €                               |
| D     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| E     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration E  
💶 **Paiements débités** : 900 €
### Cas n° 2
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B – Paiement B = 200 €
- DEPÔT C : Décla C – ❌ Pas de paiement
- DEPÔT D : Décla D – Paiement D = 300 €
- DEPÔT E : Décla E – Paiement E = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | NON                          | NON                                     | 0 €                                 |
| B     | NON                          | NON                                     | 0 €                                 |
| C     | OUI (mais rectifiée)         | OUI (sans paiement)                     | 0 €                                 |
| D     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| E     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration E  
💶 **Paiements débités** : 800 €
### Cas n° 3
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 300 €
- DEPÔT B : Décla B – Paiement B = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| B     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration B  
💶 **Paiements débités** : 800 €
### Cas n° 4
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B et Paiement B = ❌ Rejetés
- DEPÔT C : Décla C – Paiement C = 300 €
- DEPÔT D : Décla D – Paiement D = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | OUI (mais rectifiée)         | OUI                                     | 400 €                               |
| B     | NON (rejetée)                | NON (rejetée)                           | 0 €                                 |
| C     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| D     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration D  
💶 **Paiements débités** : 1200 €
### Cas n° 5
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A et Paiement A = ❌ Rejetés
- DEPÔT B : Décla B – Paiement B = 300 €
- DEPÔT C : Décla C – Paiement C = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | NON (rejetée)                | NON (rejetée)                           | 0 €                                 |
| B     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| C     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration C  
💶 **Paiements débités** : 800 €
### Cas n° 6
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = ❌ Paiement rejeté
- DEPÔT B : Décla B – Paiement B = 300 €
- DEPÔT C : Décla C – Paiement C = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | OUI (mais rectifiée)         | NON (rejeté)                            | 0 €                                 |
| B     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| C     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration C  
💶 **Paiements débités** : 800 €
### Cas n° 7
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B et Paiement B = ❌ Paiement rejeté
- DEPÔT C : Décla C – Paiement C = 300 €
- DEPÔT D : Décla D – Paiement D = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE              | INFORMATION DE PAIEMENT PRISE EN COMPTE                        | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|-------------------------------------------|----------------------------------------------------------------|-------------------------------------|
| A     | NON                                       | OUI (dernier paiement accepté effectué avant la DLS)           | 400 €                               |
| B     | OUI (mais rectifiée)                      | NON (rejetée)                                                  | 0 €                                 |
| C     | OUI (mais rectifiée)                      | OUI                                                            | 300 €                               |
| D     | OUI                                       | OUI                                                            | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration D  
💶 **Paiements débités** : 1200 €
### Cas n° 8
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B et Paiement B = 100 € (❌ Déclaration rejetée)
- DEPÔT C : Décla C – Paiement C = 300 €
- DEPÔT D : Décla D – Paiement D = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE                                               | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|---------------------------------------------------------------------------|-----------------------------------------|-------------------------------------|
| A     | OUI (mais rectifiée, dernière déclaration acceptée effectuée avant la DLS) | NON                                     | 0 €                                 |
| B     | NON (rejetée)                                                             | OUI                                     | 100 €                               |
| C     | OUI (mais rectifiée)                                                     | OUI                                     | 300 €                               |
| D     | OUI                                                                       | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration D  
💶 **Paiements débités** : 900 €
### Cas n° 9
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A et Paiement A = 100 € ❌ Déclaration rejetée
- DEPÔT B : Décla B – Paiement B = 300 €
- DEPÔT C : Décla C – Paiement C = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | NON (rejetée)                | OUI                                     | 100 €                               |
| B     | OUI (mais rectifiée)         | OUI                                     | 300 €                               |
| C     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration C  
💶 **Paiements débités** : 900 €
### Cas n° 10
DLS : DATE LIMITE DE SUBSTITUTION     => DLS = DLD - 3
DLD : DATE LIMITE DE DÉPÔT
### Dépôts réalisés :

- DEPÔT A : Décla A – Paiement A = 400 €
- DEPÔT B : Décla B et Paiement B = 100 € ❌ Déclaration rejetée
- DEPÔT C : Décla C – Paiement C = 300 €
- DEPÔT D : Décla D – Paiement D = 500 €

---

### Récapitulatif :

| DÉPÔT | DÉCLARATION PRISE EN COMPTE | INFORMATION DE PAIEMENT PRISE EN COMPTE | MONTANT DU PAIEMENT PRIS EN COMPTE |
|-------|------------------------------|-----------------------------------------|-------------------------------------|
| A     | OUI (mais rectifiée)         | NON                                     | 0 €                                 |
| B     | NON (rejetée)                | OUI                                     | 100 €                               |
| C     | OUI                          | OUI                                     | 300 €                               |
| D     | OUI                          | OUI                                     | 500 €                               |

✅ **Déclaration prise en compte** : Déclaration C  
💶 **Paiements débités** : 900 €
04/TEST WITH POSTMAN
## 🧪 Postman

Postman is an API platform for building and using APIs:  
🔗 https://www.postman.com

You can create a new workspace dedicated to **ASPOne REST API** :
Then you can import JSON or YAML files generated by Swagger to auto-configure Postman
## 🧪 Postman

**Authorization header** is configured correctly by default in the **AUTHENTICATION** module.

⚠️ But in all other modules, you must change the **Auth type** to **Bearer Token** :

```http
Auth Type: Bearer Token
Token: {{bearerToken}}
In Postman, go to the Authorization tab of your request, select Bearer Token from the dropdown, and use a variable like {{bearerToken}} to dynamically inject your access token.
05/ SOAP / REST MATCHING
## 🔄 SOAP / REST matching

To make the migration easier, we indicate below the matching between SOAP actions and REST resources.

| **SOAP Action**                 | **REST Resource**                                                                                      |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| **WS Registering**             |                                                                                                         |
| registerPrimaryAccount         | POST /v1/account/clients                                                                                |
| registerSecondaryAccount       |                                                                                                         |
| modifyPrimaryAccount           | PUT /v1/account/clients/{clientAccountId}                                                               |
| modifySecondaryAccount         |                                                                                                         |
| getAccountState                | GET /v1/account/clients/{clientAccountId} → `state` attribute                                           |
| modifyAccountState             | PUT /v1/account/clients/{clientAccountId}/state                                                         |
| **WS Alert**                   |                                                                                                         |
| getConfigurationAlert          | **Alert global configuration** :  
|                                | GET /v1/account/clients/{clientAccountId} → `options` → `alert` object                                  |
|                                | **Alert configuration for a given teleprocedure** :  
|                                | GET /v1/account/clients/{clientAccountId}/alerts/{teleprocedure}                                       |
| modifyConfigurationAlert       | **Alert global configuration** :  
|                                | PUT /v1/account/clients/{clientAccountId} → `options` → `alert` object                                  |
|                                | **Alert configuration for a given teleprocedure** :  
|                                | POST /v1/account/clients/{clientAccountId}/alerts/{teleprocedure}                                      |
|                                | DELETE /v1/account/clients/{clientAccountId}/alerts/{teleprocedure}                                    |
| **WS Bank Statement**          |                                                                                                         |
| statementSearch                | POST /v1/bank/statements/search                                                                        |
| getStatement                   | GET /v1/bank/statements/{statementId}  
|                                | GET /v1/files/{fileId}/contents                                                                         |
| getTransactionsDeleted         | **In JSON format** :  
|                                | GET /v1/bank/statements/{statementId}/transactions/deleted                                              |
|                                | **In CSV format** :  
|                                | GET /v1/bank/statements/{statementId}/transactions/deleted/csv                                         |
## 🔄 SOAP / REST matching (suite)

### 📥 WS Deposit

| **SOAP Action**            | **REST Resource**                                                                                  |
|---------------------------|-----------------------------------------------------------------------------------------------------|
| addDocument               | POST /v1/teleprocedure/deposits with parameter tradOnly=false                                       |
| translateDocument         | POST /v1/teleprocedure/deposits with parameter tradOnly=true                                        |
| addWebdeclaration         | POST /v1/web/declarations                                                                            |
| interchangeSearch         | POST /v1/teleprocedure/interchanges/search                                                          |
| declarationSearch         | POST /v2/teleprocedure/declarations/sent/search                                                     |
| receptionSearch           | POST /v2/teleprocedure/declarations/received/search                                                 |
| getDeclarationDetails     | GET /v1/teleprocedure/declarations/{declarationId}                                                  |
| getInterchangeByDepositID | GET /v1/teleprocedure/deposits/{depositId}  
|                           | GET /v1/teleprocedure/interchanges/{interchangeId}                                                  |

---

### 📊 WS Monitoring

| **SOAP Action**                 | **REST Resource**                                                                                     |
|--------------------------------|--------------------------------------------------------------------------------------------------------|
| getEdiFiles                    | GET /v1/teleprocedure/interchanges/{interchangeId}/files with format=EDI  
|                                | GET /v1/teleprocedure/declarations/{declarationId}/files with format=EDI                              |
| getXmlFiles                    | GET /v1/teleprocedure/interchanges/{interchangeId}/files with format=XML  
|                                | GET /v1/teleprocedure/declarations/{declarationId}/files with format=XML                              |
| recipientReportSearch          | POST /v1/teleprocedure/reports/search                                                                  |
| getRecipientReportById         | GET /v1/teleprocedure/reports/{reportId}  
|                                | GET /v1/files/{fileId}/contents                                                                        |
| getRecipientReports            | GET /v1/teleprocedure/declarations/{declarationId}/reports  
|                                | GET /v1/files/{fileId}/contents                                                                        |
| getDeclarativeCertificate      | GET /v1/teleprocedure/declarations/{declarationId}/certificate                                         |
| getFicheParametrageDSNFiles    | GET /v1/teleprocedure/dsn/param/sheets/search  
|                                | GET /v1/files/{fileId}/contents                                                                        |
| getFicheBpijDSNFiles           | GET /v1/teleprocedure/dsn/bpij/sheets/search  
|                                | GET /v1/files/{fileId}/contents                                                                        |
| getInterchangeBydWebdeclarationId | GET /v1/web/declarations/{webdeclarationId}  
|                                | GET /v1/teleprocedure/deposits/{depositId}  
|                                | GET /v1/teleprocedure/interchanges/{interchangeId}                                                    |
| findAuthorizedAccountsForMonitoring | POST /v1/account/clients/search                                                                    |
| getResponseOgaDocumentById     | ~~❌ EDI-OGA interface was deleted in August 2022~~                                                    |
