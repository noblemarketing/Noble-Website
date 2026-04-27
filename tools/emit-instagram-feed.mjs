/**
 * One-off emitter: writes ../instagram-feed.json from embedded Behold/IG payload.
 * Run: node tools/emit-instagram-feed.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "instagram-feed.json");

const feed = {
  username: "thenoblemarketing",
  biography:
    "Helping businesses show up with intention\n✨ Branding · Websites · Social Media\nLet\u2019s work together!",
  profilePictureUrl:
    "https://cdn2.behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/17841453341047371/profile.webp",
  website: "http://thenoblemarketing.com",
  followersCount: 152,
  followsCount: 86,
  posts: [
    {
      id: "18104840779910405",
      timestamp: "2026-04-10T19:46:30+0000",
      permalink: "https://www.instagram.com/reel/DW9p97YExY4/",
      mediaType: "VIDEO",
      isReel: true,
      thumbnailUrl:
        "https://scontent-sof1-2.cdninstagram.com/v/t51.71878-15/670418386_968119288986234_2475955302063100990_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=i0Y9qtrWbM4Q7kNvwGHPuDm&_nc_oc=Adow6qOR1nAbGPMnPOcmAMakiwOcM3sNnUVNMLXItHT5in2G496t8OA-ZkPFo-GC63NvSDYKAvRObxc2zz5E9SU4&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQHH5dRiU92tWnT_UbNgOO2K5XzO_coXb8lfKYXlH8XEu8jr3QITBt63PfIDwoaKflF5KH4UwbPkdA&oh=00_Af2DDg1Ef8jqypFpbQvtr4gLqhxK9vvygsTSewlDK2lfzw&oe=69F538C5",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18104840779910405/small.jpg",
          height: 400,
          width: 225,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18104840779910405/medium.jpg",
          height: 700,
          width: 394,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18104840779910405/large.jpg",
          height: 1000,
          width: 563,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18104840779910405/full.jpg",
          height: 1136,
          width: 640,
        },
      },
      caption: "Don't have weekend plans? Now you do. 🔥",
      prunedCaption: "Don't have weekend plans? Now you do. 🔥",
      hashtags: [],
      mentions: [],
      colorPalette: {
        dominant: "103,76,68",
        muted: "170,116,94",
        mutedLight: "162,174,172",
        mutedDark: "52,68,84",
        vibrant: "179,94,23",
        vibrantLight: "212,175,123",
        vibrantDark: "171,59,15",
      },
      isSharedToFeed: true,
    },
    {
      id: "18096125648023773",
      timestamp: "2026-04-08T13:03:23+0000",
      permalink: "https://www.instagram.com/p/DW3yQ2wFAM2/",
      mediaType: "CAROUSEL_ALBUM",
      mediaUrl:
        "https://scontent-sof1-2.cdninstagram.com/v/t51.82787-15/659804856_18042842273778035_7025533165383490982_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=b_bhvpeTsekQ7kNvwFAj7bh&_nc_oc=AdoD-tbiYEQEejeRMy1_sA8BeS--HEnDCcPuOY23qwaAC3AVqOT5BupFLLNrv55QGBsLg47pj8NL4T76da-Sm5gf&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQFAL3rMHrahTZuAlru3p7o0yt5-kIVMNJkq1_NMgfVSebVWZqMugxZ3fNAhDJrmxFbYU1coza4XDA&oh=00_Af2TciaWcLgiygPqUAOBExp48TUELv5kGvH_39idM565rA&oe=69F545D4",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096125648023773/small.jpg",
          height: 400,
          width: 320,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096125648023773/medium.jpg",
          height: 700,
          width: 560,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096125648023773/large.jpg",
          height: 1000,
          width: 800,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096125648023773/full.jpg",
          height: 1350,
          width: 1080,
        },
      },
      caption:
        "I ask this on every discovery call and the answer always changes how I approach the project.\n\nWhat do YOU want people to feel?\n\nIf you're ready to build a brand that honors what you stand for and connects meaningfully with the people you serve, let's talk. Link in bio.\n\n#brandstrategy #brandidentity #designstudio #brandingdesign #clientfocused #strategicdesign #brandexperience #marketinganddesign #smallbusinessbranding #purposebuiltdesign",
      prunedCaption:
        "I ask this on every discovery call and the answer always changes how I approach the project.\n\nWhat do YOU want people to feel?\n\nIf you're ready to build a brand that honors what you stand for and connects meaningfully with the people you serve, let's talk. Link in bio.",
      hashtags: [
        "brandstrategy",
        "brandidentity",
        "designstudio",
        "brandingdesign",
        "clientfocused",
        "strategicdesign",
        "brandexperience",
        "marketinganddesign",
        "smallbusinessbranding",
        "purposebuiltdesign",
      ],
      mentions: [],
      colorPalette: {
        dominant: "154,140,127",
        muted: "140,128,116",
        mutedLight: "212,196,188",
        mutedDark: "88,72,53",
        vibrant: "155,118,99",
        vibrantLight: "203,184,174",
        vibrantDark: "80,61,51",
      },
      children: [
        {
          id: "17878748103556756",
          mediaType: "IMAGE",
          mediaUrl:
            "https://scontent-sof1-2.cdninstagram.com/v/t51.82787-15/659804856_18042842273778035_7025533165383490982_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=b_bhvpeTsekQ7kNvwFAj7bh&_nc_oc=AdoD-tbiYEQEejeRMy1_sA8BeS--HEnDCcPuOY23qwaAC3AVqOT5BupFLLNrv55QGBsLg47pj8NL4T76da-Sm5gf&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQFSpn0RXx0QcoMb0H9R3oileBFqt0_ZM3BbpdJ8BjO78tKxYNtLfIZUBhhSqKC81N0IPFA845nk3Q&oh=00_Af3eVFSLF21_f9fcmi5bN6F4VZRZArtZQyhM-IHW6GY1mw&oe=69F545D4",
          sizes: {
            small: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17878748103556756/small.jpg",
              height: 400,
              width: 320,
            },
            medium: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17878748103556756/medium.jpg",
              height: 700,
              width: 560,
            },
            large: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17878748103556756/large.jpg",
              height: 1000,
              width: 800,
            },
            full: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17878748103556756/full.jpg",
              height: 1350,
              width: 1080,
            },
          },
          colorPalette: {
            dominant: "154,140,127",
            muted: "140,128,116",
            mutedLight: "212,196,188",
            mutedDark: "88,72,53",
            vibrant: "155,118,99",
            vibrantLight: "203,184,174",
            vibrantDark: "80,61,51",
          },
        },
        {
          id: "18110793184795034",
          mediaType: "IMAGE",
          mediaUrl:
            "https://scontent-sof1-1.cdninstagram.com/v/t51.82787-15/669842818_18042842282778035_2407250450797314164_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=erqBsPfiyNkQ7kNvwHRGZ95&_nc_oc=Adpp05J75JDUU7pCXBehTH4HtiyfUpziEU1vJtB8i02hhnvOzSc3qmVMQyPHr84Nt-oI4ZYpUOxYJFkRS70upFat&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQHpFsMfYraVkmj41WIZyENx-mjNDiKtraaVvzXraygofqmKB2pH03vL5_XtXEWLRNtfuXBZG349YA&oh=00_Af0sTtNZP7_nrB22lK3nvR6kIMkIfFSAR-EGZCQO3L5VPw&oe=69F55233",
          sizes: {
            small: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18110793184795034/small.jpg",
              height: 400,
              width: 320,
            },
            medium: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18110793184795034/medium.jpg",
              height: 700,
              width: 560,
            },
            large: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18110793184795034/large.jpg",
              height: 1000,
              width: 800,
            },
            full: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18110793184795034/full.jpg",
              height: 1350,
              width: 1080,
            },
          },
          colorPalette: {
            dominant: "154,140,127",
            muted: "140,128,116",
            mutedLight: "212,196,188",
            mutedDark: "88,72,53",
            vibrant: "155,118,99",
            vibrantLight: "203,184,174",
            vibrantDark: "80,61,51",
          },
        },
        {
          id: "18146190157483200",
          mediaType: "IMAGE",
          mediaUrl:
            "https://scontent-sof1-2.cdninstagram.com/v/t51.82787-15/660424975_18042842300778035_4467522117602805911_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=sRtG5ZRCRXgQ7kNvwEXo86s&_nc_oc=AdptAuwsiSB1gEsFElkOY7EL-M8q-OTzCyYUzoF6UaOcrCsOeyz65O-Ycad43rhZaAa0OdsxBI0d0K74qtD7XTEw&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQHxiVPyqk8tSUlCoGWnQDF15TmJTtKXn11qkWuni0oeLT6CjeII6l7fSC-0M7rgv_ho3TB9uKBoPQ&oh=00_Af0PxDurqfDvU2DwYaOPTyXSmlKPOj_XCTUnpSIqb-JkRA&oe=69F55F0B",
          sizes: {
            small: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18146190157483200/small.jpg",
              height: 400,
              width: 320,
            },
            medium: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18146190157483200/medium.jpg",
              height: 700,
              width: 560,
            },
            large: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18146190157483200/large.jpg",
              height: 1000,
              width: 800,
            },
            full: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18146190157483200/full.jpg",
              height: 1350,
              width: 1080,
            },
          },
          colorPalette: {
            dominant: "154,140,127",
            muted: "140,128,116",
            mutedLight: "212,196,188",
            mutedDark: "88,72,53",
            vibrant: "155,118,99",
            vibrantLight: "203,184,174",
            vibrantDark: "80,61,51",
          },
        },
        {
          id: "17862392022674748",
          mediaType: "IMAGE",
          mediaUrl:
            "https://scontent-sof1-2.cdninstagram.com/v/t51.82787-15/660348885_18042842291778035_3541567275863749973_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Hyd6L2lZSAYQ7kNvwFM2UUI&_nc_oc=AdrcfnjIP4DbpAZDMKdJ-Qq4jC9IXGTg5qTKoO6w-qOucxzrVUsqabjr11bb6UyHx1Caw5VwWENaJj1opjkMAvwP&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQGe64XZ8SC996MiysJbCEvlj_0JwKBPdwmAzMDqRZoVshiHe61-KX2TqYjO5GQxPaa7RbAHCx201A&oh=00_Af3qGjl9h2U4qBMpTJX_3gVEU1Ug1UmO1Rh8K31V8981SQ&oe=69F53545",
          sizes: {
            small: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17862392022674748/small.jpg",
              height: 400,
              width: 320,
            },
            medium: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17862392022674748/medium.jpg",
              height: 700,
              width: 560,
            },
            large: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17862392022674748/large.jpg",
              height: 1000,
              width: 800,
            },
            full: {
              mediaUrl:
                "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17862392022674748/full.jpg",
              height: 1350,
              width: 1080,
            },
          },
          colorPalette: {
            dominant: "153,140,127",
            muted: "140,128,116",
            mutedLight: "212,196,188",
            mutedDark: "88,72,53",
            vibrant: "155,118,99",
            vibrantLight: "203,184,174",
            vibrantDark: "80,61,51",
          },
        },
      ],
    },
    {
      id: "18096788864008757",
      timestamp: "2026-03-31T16:01:26+0000",
      permalink: "https://www.instagram.com/p/DWjgUuZFI1J/",
      mediaType: "IMAGE",
      mediaUrl:
        "https://scontent-sof1-1.cdninstagram.com/v/t51.82787-15/657892253_18041832062778035_7048125903013876383_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=tijkKY3DZ_8Q7kNvwGp-W4T&_nc_oc=Adp4xHHHpthzkxWCTQFckf-3vJeIcL5-HdBy7w7U_EDWaiEZeM4OFD1d5BoHJOcKB-u0xXa9Vqsjamc1XDOHK8xq&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQEkkhPujtbA9WowHmSKqtwTC5mAKkRoKzRPWiD409aEtH6cu6Wh-QFT3y0HUZp7FWjiJvyjVGXeAA&oh=00_Af3AzYKxwETe1LyA_A4bgkjjB_qQM3XeRcE1WLghTE9nzA&oe=69F550EB",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096788864008757/small.jpg",
          height: 400,
          width: 320,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096788864008757/medium.jpg",
          height: 700,
          width: 560,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096788864008757/large.jpg",
          height: 1000,
          width: 800,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18096788864008757/full.jpg",
          height: 1350,
          width: 1080,
        },
      },
      caption:
        "Stripping away what doesn't serve the vision and amplifying what does because a strong brand doesn't need to shout. It needs clarity, intention, and a cohesive system built to communicate expertise at every touchpoint.\n\nWhen your brand is rooted in purpose rather than noise, it resonates deeper and lasts longer.\n\n#brandstrategy #brandidentity #craftsmanship #intentionaldesign #brandingagency #visualidentity #designphilosophy #brandcohesion #marketingdesign #strategicbranding",
      prunedCaption:
        "Stripping away what doesn't serve the vision and amplifying what does because a strong brand doesn't need to shout. It needs clarity, intention, and a cohesive system built to communicate expertise at every touchpoint.\n\nWhen your brand is rooted in purpose rather than noise, it resonates deeper and lasts longer.",
      hashtags: [
        "brandstrategy",
        "brandidentity",
        "craftsmanship",
        "intentionaldesign",
        "brandingagency",
        "visualidentity",
        "designphilosophy",
        "brandcohesion",
        "marketingdesign",
        "strategicbranding",
      ],
      mentions: [],
      colorPalette: {
        dominant: "128,109,90",
        muted: "136,120,101",
        mutedLight: "203,196,172",
        mutedDark: "75,56,43",
        vibrant: "185,120,69",
        vibrantLight: "244,244,252",
        vibrantDark: "97,63,36",
      },
    },
    {
      id: "17924550996257411",
      timestamp: "2026-03-29T20:00:00+0000",
      permalink: "https://www.instagram.com/reel/DWeyJwuhrV8/",
      mediaType: "VIDEO",
      isReel: true,
      thumbnailUrl:
        "https://scontent-sof1-1.cdninstagram.com/v/t51.71878-15/656278286_2323377144841910_6096710702317376762_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=2ifV7uirtY8Q7kNvwGEZ9xf&_nc_oc=AdqV75UhTDivhcB_z-P-SFhYxd_yKP9aGr9iSqPlucx12MBDG-3RhqYn7uSnmR_9kF53LgUd7TWINKMsVHq1EvBC&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQFDPOxBZXnJn3gVkamueY2Hkke-ztM8O5ro5agAMtEXFBMBo68JvOHqTozp7XxczmFTyW951rrqYw&oh=00_Af03ghYlBYnsOr_7QqZmucjvmeAiLQrCaBCtqaFIZAj8ow&oe=69F52FF3",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17924550996257411/small.jpg",
          height: 400,
          width: 225,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17924550996257411/medium.jpg",
          height: 700,
          width: 394,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17924550996257411/large.jpg",
          height: 1000,
          width: 563,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17924550996257411/full.jpg",
          height: 1136,
          width: 640,
        },
      },
      caption: "Ready to hand off socials and focus on the rest of your to-do list?",
      prunedCaption: "Ready to hand off socials and focus on the rest of your to-do list?",
      hashtags: [],
      mentions: [],
      colorPalette: {
        dominant: "138,134,119",
        muted: "140,140,124",
        mutedLight: "208,199,176",
        mutedDark: "78,53,35",
        vibrant: "179,126,75",
        vibrantLight: "215,188,161",
        vibrantDark: "106,75,45",
      },
      isSharedToFeed: true,
    },
    {
      id: "18080561033435299",
      timestamp: "2026-03-27T15:01:01+0000",
      permalink: "https://www.instagram.com/p/DWZGOrZlGT3/",
      mediaType: "IMAGE",
      mediaUrl:
        "https://scontent-sof1-2.cdninstagram.com/v/t51.82787-15/657956651_18041280542778035_8298829462902553469_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=NDGZ_rkT108Q7kNvwFWRXvC&_nc_oc=Adocaj_yedk-7bXdKshGDTdrGW2cUBJHZ3CZjL3ktfbQUm4UuGEAgCn_ILMnzQ_tsp9nIev6Z2ono8CMQ0SAQyaO&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQH59VFDoinYMXsVrG052GiJXQP0m-oiyxxga5-rVx2B_ljRmXm1wIRtRKY4G48WmvgGLRiwpbV3UA&oh=00_Af1d_QZRmWGE9Ct4NgzXSOC-p6FLHapdiDsapOSZure7dQ&oe=69F53C59",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18080561033435299/small.jpg",
          height: 400,
          width: 320,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18080561033435299/medium.jpg",
          height: 700,
          width: 560,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18080561033435299/large.jpg",
          height: 1000,
          width: 800,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/18080561033435299/full.jpg",
          height: 1350,
          width: 1080,
        },
      },
      caption:
        "Consistent, intentional content builds trust. It keeps you visible. It positions you as the go-to expert in your space. And it creates momentum that sporadic posting simply can't match.\n\nBut consistency doesn't mean churning out content for the sake of it. It means showing up with purpose and creating content that reflects your brand, speaks to your audience, and moves your business forward.\n\nThat's what strategic social media management delivers: presence with intention, not just posts on a calendar.",
      prunedCaption:
        "Consistent, intentional content builds trust. It keeps you visible. It positions you as the go-to expert in your space. And it creates momentum that sporadic posting simply can't match.\n\nBut consistency doesn't mean churning out content for the sake of it. It means showing up with purpose and creating content that reflects your brand, speaks to your audience, and moves your business forward.\n\nThat's what strategic social media management delivers: presence with intention, not just posts on a calendar.",
      hashtags: [],
      mentions: [],
      colorPalette: {
        dominant: "228,226,224",
        muted: "161,143,125",
        mutedLight: "193,183,175",
        mutedDark: "74,55,42",
        vibrant: "213,177,134",
        vibrantLight: "201,172,132",
        vibrantDark: "98,69,34",
      },
    },
    {
      id: "17957033043074119",
      timestamp: "2026-03-23T17:43:32+0000",
      permalink: "https://www.instagram.com/reel/DWPFTbpEhFT/",
      mediaType: "VIDEO",
      isReel: true,
      thumbnailUrl:
        "https://scontent-sof1-1.cdninstagram.com/v/t51.71878-15/655279790_1448906227027158_4309480546510282812_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=Xxwb7z7fqgoQ7kNvwFO04Fy&_nc_oc=AdoaBuT3KQ8Uyh3qoNXj4lGB-4h91bH8R1z7d_mSU_oVXBehtydyvw--uIv063ZgGM_mr-8HVV62t16oEAxasv63&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=kOnZiyPAFE8ob_3rJhbd-g&_nc_tpa=Q5bMBQE6lzuRgFstjA8igOovRB36OMpL3rzNuNh8sD2Nvg4g3wGZ2vMMHS2gHRul5egYBYwQEvWtZNIf5g&oh=00_Af0zYoqo8QYtXy1bfDqukzR3TBBrNIC05U6wDnvUX5pdsw&oe=69F5343A",
      sizes: {
        small: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17957033043074119/small.jpg",
          height: 400,
          width: 225,
        },
        medium: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17957033043074119/medium.jpg",
          height: 700,
          width: 394,
        },
        large: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17957033043074119/large.jpg",
          height: 1000,
          width: 563,
        },
        full: {
          mediaUrl:
            "https://behold.pictures/i6R4x4FpMNeeefFPwqzGYve0n7g1/mfLxJ5f97hDcbNHS9Thm/17957033043074119/full.jpg",
          height: 1136,
          width: 640,
        },
      },
      caption:
        "Safe to say quite a few! 😁\n\nFrom manufacturing to boutiques and everything in between—each brand is built on the same foundation: listening, positioning, and craft that reflects their unique expertise. Branding that communicates credibility across every industry.",
      prunedCaption:
        "Safe to say quite a few! 😁\n\nFrom manufacturing to boutiques and everything in between—each brand is built on the same foundation: listening, positioning, and craft that reflects their unique expertise. Branding that communicates credibility across every industry.",
      hashtags: [],
      mentions: [],
      colorPalette: {
        dominant: "112,110,99",
        muted: "169,153,121",
        mutedLight: "201,195,178",
        mutedDark: "72,67,59",
        vibrant: "200,77,4",
        vibrantLight: "238,204,162",
        vibrantDark: "98,65,34",
      },
      isSharedToFeed: true,
    },
  ],
};

fs.writeFileSync(outPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
console.log("Wrote", outPath);
