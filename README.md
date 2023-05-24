# Metaphone-ts

<!--SHIELDS BEGIN-->
[![Deno](https://github.com/secondary-smiles/metaphone-ts/actions/workflows/deno.yml/badge.svg)](https://github.com/secondary-smiles/metaphone-ts/actions/workflows/deno.yml)
<!--SHIELDS END-->

> A fast implementation of Lawrence Philips' Metaphone Algorithm with some additional tweaks

## What is the Metaphone Algorithm?

The [Metaphone Algorithm](https://wikipedia.org/wiki/Metaphone) is an algorithm used to break words
into the individual sounds that make up their pronunciation.

This implementation of the algorithm is quite fast, taking approx. `380 nanoseconds` per word
according to `deno bench`
> Tested on a 2020 M1 MacBook Pro, 16gb 

## Use Cases

The Metaphone Algorithm is useful for doing fuzzy-word searching, for example, "write" and "right"
both return the same result from the metaphone algorithm since they are pronounced the same way.

The Metaphone also can be used in TTS applications such as [SAM](https://github.com/discordier/sam)

## Exports

`main.ts` exports `metaphone` which takes in one word and returns an `Array<String>` of phonemes.

The list of possible phonemes is as follows:

- `A`
- `E`
- `I`
- `O`
- `U`
- `B`
- `X`
- `S`
- `K`
- `J`
- `T`
- `F`
- `H`
- `L`
- `M`
- `N`
- `P`
- `R`
- `0` -- *theta* - the `th` sound
- `W`
- `Y`

> Vowels (other than `Y`) will only show up in the results if they are the first letter

## Import

### Node / Frontend

```bash 
yarn add metaphone-ts
```
### Deno

```ts
import {metaphone} from 'https://deno.land/x/metaphone/mod.ts'
```

## Example

### As a dependency

```ts
import { metaphone } from 'metaphone-ts'

let sounds = metaphone("charlatan")

console.log(sounds) // Prints `[ "X", "R", "L", "T", "N" ]`
```
### Converting an entire paragraph

```text
0   NN   LTS    FLKRT     IN 0   RNSKT       ALWY     AS I STPT    OT  OF 0   HFRKR     
The neon lights flickered in the rain-soaked alleyway as I stepped out of the hovercar. 

I PLT    MY HT   UP T  SLT    MSLF   FRM  0   TNPR     ANT SKNT    0   AR   FR  ANY SN   OF TRBL     
I pulled my hood up to shield myself from the downpour and scanned the area for any sign of trouble. 

0S   WS  0   KNT  OF PLS   WR    TNJR   LRKT   ARNT   EFRY  KRNR     
This was the kind of place where danger lurked around every corner 

ANT Y   HT  T  B  ON YR   KRT   AT AL  TMS  
and you had to be on your guard at all times. 

I MT   MY WY  TWRTS   0   TR   OF 0   RNTN    BLTNK     
I made my way towards the door of the rundown building, 

FLNK    0   WT     OF 0   KN  IN MY PKT  
feeling the weight of the gun in my pocket. 

INST    0   AR  WS  0K    W0   SKRT      SMK   ANT 0   SNT   OF PLSNK   MSK    
Inside, the air was thick with cigarette smoke and the sound of pulsing music. 

I MT   MY WY  T  0   BK   OF 0   RM    WR    A STY     FKR    WTT    FR  M   
I made my way to the back of the room, where a shadowy figure waited for me. 

Y    HF   WT   I NT     H  ASKT   
"You have what I need?" he asked, 

HS  FS    BRLY   ATBL    OFR  0   BS    I NTT    ANT HNTT   HM  0   SML   TFS     
his voice barely audible over the bass. I nodded and handed him the small device, 

WNK      AS H  PLJT    IT INT  HS  KMPTR     AS 0   TT   STRMT    AKRS   0   SKRN    
watching as he plugged it into his computer. As the data streamed across the screen, 

I NW   0T   I HT  JST  TKN   A STP  TPR    INT  0   WRLT  OF 0   SBRKRMNLS
I knew that I had just taken a step deeper into the world of the cybercriminals.
```
> Quote extracted from chatgpt: 'print an imaginary paragraph from a cyberpunk novel'

## The Original Metaphone Algorithm

```text
Metaphone Algorithm

   Created by Lawrence Philips (location unknown). Metaphone presented
   in article in "Computer Language" December 1990 issue.

             *********** BEGIN METAPHONE RULES ***********

 Lawrence Philips' RULES follow:

 The 16 consonant sounds:
                                             |--- ZERO represents "th"
                                             |
      B  X  S  K  J  T  F  H  L  M  N  P  R  0  W  Y

 Exceptions:

   Beginning of word: "ae-", "gn", "kn-", "pn-", "wr-"  ----> drop first letter
                      "Aebersold", "Gnagy", "Knuth", "Pniewski", "Wright"

   Beginning of word: "x"                                ----> change to "s"
                                      as in "Deng Xiaopeng"

   Beginning of word: "wh-"                              ----> change to "w"
                                      as in "Whalen"

 Transformations:

   B ----> B      unless at the end of word after "m", as in "dumb", "McComb"

   C ----> X      (sh) if "-cia-" or "-ch-"
           S      if "-ci-", "-ce-", or "-cy-"
                  SILENT if "-sci-", "-sce-", or "-scy-"
           K      otherwise, including in "-sch-"

   D ----> J      if in "-dge-", "-dgy-", or "-dgi-"
           T      otherwise

   F ----> F

   G ---->        SILENT if in "-gh-" and not at end or before a vowel
                            in "-gn" or "-gned"
                            in "-dge-" etc., as in above rule
           J      if before "i", or "e", or "y" if not double "gg"
           K      otherwise

   H ---->        SILENT if after vowel and no vowel follows
                         or after "-ch-", "-sh-", "-ph-", "-th-", "-gh-"
           H      otherwise

   J ----> J

   K ---->        SILENT if after "c"
           K      otherwise

   L ----> L

   M ----> M

   N ----> N

   P ----> F      if before "h"
           P      otherwise

   Q ----> K

   R ----> R

   S ----> X      (sh) if before "h" or in "-sio-" or "-sia-"
           S      otherwise

   T ----> X      (sh) if "-tia-" or "-tio-"
           0      (th) if before "h"
                  silent if in "-tch-"
           T      otherwise

   V ----> F

   W ---->        SILENT if not followed by a vowel
           W      if followed by a vowel

   X ----> KS

   Y ---->        SILENT if not followed by a vowel
           Y      if followed by a vowel

   Z ----> S
  ```
