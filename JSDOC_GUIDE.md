# JSDoc Dokumentation für El Pollo Loco

## Übersicht
Diese Dokumentation wurde mit JSDoc (https://jsdoc.app/) erstellt und beschreibt alle Klassen, Methoden und Funktionen des El Pollo Loco Jump'n'Run Spiels.

## ✅ Vollständig dokumentierte Dateien

### **Haupt-Spielklassen:**
- ✅ `character.class.js` - Spielercharakter Pepe mit Bewegung und Animation
- ✅ `world.class.js` - Spielwelt-Manager für Rendering und Kollisionen
- ✅ `movable-objects.class.js` - Basisklasse für bewegliche Objekte
- ✅ `drawable-objects.class.js` - Basisklasse für darstellbare Objekte
- ✅ `level.class.js` - Level-Datenstruktur
- ✅ `audioHub.class.js` - Zentrale Audio-Verwaltung

### **Gegner-Klassen:**
- ✅ `chicken.class.js` - Normale Hühner-Gegner
- ✅ `chicks.class.js` - Kleine Küken-Gegner  
- ✅ `end-boss.class.js` - Finaler Boss-Gegner

### **Sammelbare Objekte:**
- ✅ `coins.class.js` - Sammelbare Münzen
- ✅ `bottles.class.js` - Sammelbare Flaschen
- ✅ `throwable-objects.class.js` - Werfbare Flaschen-Projektile

### **UI-Elemente:**
- ✅ `status-bar.class.js` - Basis-Statusleiste
- ✅ `coins-bar.class.js` - Münzen-Zähler
- ✅ `bottle-bar.class.js` - Flaschen-Zähler
- ✅ `boss-bar.class.js` - Boss-Gesundheitsleiste

### **Hintergrund-Elemente:**
- ✅ `background.class.js` - Hintergrund-Objekte
- ✅ `clouds.class.js` - Wolken-Animation

### **Input/Control:**
- ✅ `keyboard.class.js` - Tastatur-Input Handler

### **Spiel-Management:**
- ✅ `game.js` - Hauptspielfunktionen
- ✅ `level1.js` - Level 1 Konfiguration
- ✅ `new_game.js` - Spielstart-Sequenz

### **Konfiguration:**
- ✅ `jsdoc.conf.json` - JSDoc Konfiguration
- ✅ `jsdoc-definitions.js` - Typdefinitionen

### Global installieren:
```bash
npm install -g jsdoc
```

### Lokal für das Projekt installieren:
```bash
npm install --save-dev jsdoc
```

## Dokumentation generieren

### Mit der Konfigurationsdatei:
```bash
jsdoc -c jsdoc.conf.json
```

### Manuell (alle JS-Dateien):
```bash
jsdoc assets/js/**/*.js -d docs/
```

## Projekt-Struktur

### Hauptklassen:

#### **Character** (`character.class.js`)
- Hauptspielcharakter Pepe
- Bewegung, Animation, Sprung, Schaden
- Erbt von `MovableObject`

#### **World** (`world.class.js`) 
- Spielwelt-Manager
- Kollisionserkennung, Rendering, Spiellogik
- Koordiniert alle Spielobjekte

#### **MovableObject** (`movable-objects.class.js`)
- Basisklasse für bewegliche Objekte
- Physik, Animation, Kollision
- Basis für Character, Chicken, Boss, etc.

#### **Chicken** (`chicken.class.js`)
- Gegner-Huhn
- Automatische Bewegung nach links
- Besiegbar durch Aufspringen

#### **AudioHub** (`audioHub.class.js`)
- Zentrale Audio-Verwaltung
- Hintergrundmusik, Sound-Effekte
- Mute/Unmute Funktionalität

### Hilfsklassen:
- **DrawableObject**: Basis für alle darstellbaren Objekte
- **Keyboard**: Tastatur-Input Verarbeitung
- **StatusBar**, **CoinsBar**, **BottlesBar**: UI-Elemente
- **ThrowableObject**: Werfbare Flaschen
- **Endboss**: Finaler Bossgegner

## JSDoc Kommentar-Syntax

### Klassen:
```javascript
/**
 * Beschreibung der Klasse
 * @extends BasisKlasse
 */
class MeineKlasse extends BasisKlasse {
```

### Eigenschaften:
```javascript
/** @type {number} - Beschreibung der Eigenschaft */
speed = 10;
```

### Methoden:
```javascript
/**
 * Beschreibung der Methode
 * @param {string} param1 - Beschreibung Parameter 1
 * @param {number} param2 - Beschreibung Parameter 2  
 * @returns {boolean} Beschreibung des Rückgabewerts
 */
meineMethode(param1, param2) {
    // ...
}
```

### Konstruktoren:
```javascript
/**
 * Erstellt eine neue Instanz
 * @constructor
 * @param {Object} options - Konfigurationsoptionen
 */
constructor(options) {
    // ...
}
```

## Dokumentations-Tags

- `@param {type} name - description` - Parameter
- `@returns {type} description` - Rückgabewert
- `@type {type} - description` - Eigenschaftstyp
- `@extends ClassName` - Vererbung
- `@constructor` - Konstruktor
- `@static` - Statische Methode
- `@deprecated` - Veraltete Funktion
- `@example` - Beispielcode
- `@see` - Verweis auf andere Dokumentation
- `@since` - Version seit wann verfügbar
- `@todo` - Geplante Verbesserungen

## Ausgabe

Die generierte Dokumentation wird im `docs/` Ordner erstellt und enthält:
- `index.html` - Hauptseite mit Übersicht
- Detailseiten für alle Klassen und Methoden
- Navigationsstruktur
- Suchfunktion

## Konfiguration (`jsdoc.conf.json`)

```json
{
  "source": {
    "include": ["./assets/js/"],
    "includePattern": "\\.(js)$"
  },
  "opts": {
    "destination": "./docs/",
    "recurse": true
  }
}
```

## Beispiel für vollständige Klassen-Dokumentation:

```javascript
/**
 * Repräsentiert einen Spielcharakter
 * @extends MovableObject
 * @example
 * const player = new Character();
 * player.jump();
 */
class Character extends MovableObject {
    /** @type {number} - Geschwindigkeit in Pixeln pro Frame */
    speed = 16;
    
    /**
     * Lässt den Charakter springen
     * @param {number} [force=20] - Sprungkraft
     * @returns {boolean} True wenn Sprung erfolgreich
     */
    jump(force = 20) {
        if (!this.isJumping) {
            this.speedY = force;
            return true;
        }
        return false;
    }
}
```

## Wartung der Dokumentation

1. **Neue Klassen**: Immer mit JSDoc Kommentar beginnen
2. **Öffentliche Methoden**: Vollständig dokumentieren
3. **Parameter und Rückgabewerte**: Typen und Beschreibungen angeben
4. **Eigenschaften**: Mit @type Tag dokumentieren
5. **Regelmäßig regenerieren**: Bei Code-Änderungen Doku aktualisieren

Die Dokumentation hilft anderen Entwicklern (und Ihnen selbst) beim Verstehen und Erweitern des Codes!
