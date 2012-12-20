(function($){
	//mechlab_items = {};

	// This is not super elegant right now. Not too important really.
	mechlab_items = 
    	{
       "mechs": [
          {
             "id": "1",
             "name": "hbk-4g",
             "mdf": "\\hunchback\\hbk-4g.mdf"
          },
          {
             "id": "2",
             "name": "hbk-4p",
             "mdf": "\\hunchback\\hbk-4p.mdf"
          },
          {
             "id": "3",
             "name": "jr7-d",
             "mdf": "\\jenner\\jr7-d.mdf"
          },
          {
             "id": "4",
             "name": "jr7-f",
             "mdf": "\\jenner\\jr7-f.mdf"
          },
          {
             "id": "5",
             "name": "com-2d",
             "mdf": "\\commando\\com-2d.mdf"
          },
          {
             "id": "6",
             "name": "com-3a",
             "mdf": "\\commando\\com-3a.mdf"
          },
          {
             "id": "7",
             "name": "cn9-a",
             "mdf": "\\centurion\\cn9-a.mdf"
          },
          {
             "id": "9",
             "name": "hbk-4h",
             "mdf": "\\hunchback\\hbk-4h.mdf"
          },
          {
             "id": "10",
             "name": "drg-1n",
             "mdf": "\\dragon\\drg-1n.mdf"
          },
          {
             "id": "11",
             "name": "drg-1c",
             "mdf": "\\dragon\\drg-1c.mdf"
          },
          {
             "id": "12",
             "name": "cplt-c1",
             "mdf": "\\catapult\\cplt-c1.mdf"
          },
          {
             "id": "13",
             "name": "cplt-a1",
             "mdf": "\\catapult\\cplt-a1.mdf"
          },
          {
             "id": "14",
             "name": "aws-8q",
             "mdf": "\\awesome\\aws-8q.mdf"
          },
          {
             "id": "15",
             "name": "aws-8r",
             "mdf": "\\awesome\\aws-8r.mdf"
          },
          {
             "id": "16",
             "name": "as7-d",
             "mdf": "\\atlas\\as7-d.mdf"
          },
          {
             "id": "17",
             "name": "as7-d-dc",
             "mdf": "\\atlas\\as7-d-dc.mdf"
          },
          {
             "id": "18",
             "name": "as7-rs",
             "mdf": "\\atlas\\as7-rs.mdf"
          },
          {
             "id": "19",
             "name": "cplt-k2",
             "mdf": "\\catapult\\cplt-k2.mdf"
          },
          {
             "id": "20",
             "name": "jr7-k",
             "mdf": "\\jenner\\jr7-k.mdf"
          },
          {
             "id": "21",
             "name": "hbk-4j",
             "mdf": "\\hunchback\\hbk-4j.mdf"
          },
          {
             "id": "22",
             "name": "hbk-4sp",
             "mdf": "\\hunchback\\hbk-4sp.mdf"
          },
          {
             "id": "23",
             "name": "drg-5n",
             "mdf": "\\dragon\\drg-5n.mdf"
          },
          {
             "id": "24",
             "name": "cplt-c4",
             "mdf": "\\catapult\\cplt-c4.mdf"
          },
          {
             "id": "25",
             "name": "as7-k",
             "mdf": "\\atlas\\as7-k.mdf"
          },
          {
             "id": "26",
             "name": "com-1b",
             "mdf": "\\commando\\com-1b.mdf"
          },
          {
             "id": "27",
             "name": "com-1d",
             "mdf": "\\commando\\com-1d.mdf"
          },
          {
             "id": "28",
             "name": "cn9-al",
             "mdf": "\\centurion\\cn9-al.mdf"
          },
          {
             "id": "29",
             "name": "cn9-d",
             "mdf": "\\centurion\\cn9-d.mdf"
          },
          {
             "id": "30",
             "name": "aws-8t",
             "mdf": "\\awesome\\aws-8t.mdf"
          },
          {
             "id": "31",
             "name": "aws-8v",
             "mdf": "\\awesome\\aws-8v.mdf"
          },
          {
             "id": "32",
             "name": "aws-9m",
             "mdf": "\\awesome\\aws-9m.mdf"
          },
          {
             "id": "33",
             "name": "rvn-3l",
             "mdf": "\\raven\\rvn-3l.mdf"
          },
          {
             "id": "34",
             "name": "rvn-2x",
             "mdf": "\\raven\\rvn-2x.mdf"
          },
          {
             "id": "35",
             "name": "rvn-4x",
             "mdf": "\\raven\\rvn-4x.mdf"
          },
          {
             "id": "36",
             "name": "cda-3m",
             "mdf": "\\cicada\\cda-3m.mdf"
          },
          {
             "id": "37",
             "name": "cda-2a",
             "mdf": "\\cicada\\cda-2a.mdf"
          },
          {
             "id": "38",
             "name": "cda-2b",
             "mdf": "\\cicada\\cda-2b.mdf"
          },
          {
             "id": "39",
             "name": "cda-3c",
             "mdf": "\\cicada\\cda-3c.mdf"
          },
          {
             "id": "40",
             "name": "ctf-3d",
             "mdf": "\\cataphract\\ctf-3d.mdf"
          },
          {
             "id": "41",
             "name": "ctf-1x",
             "mdf": "\\cataphract\\ctf-1x.mdf"
          },
          {
             "id": "42",
             "name": "ctf-2x",
             "mdf": "\\cataphract\\ctf-2x.mdf"
          },
          {
             "id": "44",
             "name": "ctf-4x",
             "mdf": "\\cataphract\\ctf-4x.mdf"
          },
          {
             "id": "45",
             "name": "cn9-ylw",
             "mdf": "\\centurion\\cn9-ylw.mdf"
          },
          {
             "id": "54",
             "name": "ctf-hero01",
             "mdf": "\\cataphract\\ctf-hero01.mdf"
          },
          {
             "id": "996",
             "name": "jr7-d-founder",
             "mdf": "\\jenner\\jr7-d-founder.mdf"
          },
          {
             "id": "997",
             "name": "cplt-c1-founder",
             "mdf": "\\catapult\\cplt-c1-founder.mdf"
          },
          {
             "id": "998",
             "name": "hbk-4g-founder",
             "mdf": "\\hunchback\\hbk-4g-founder.mdf"
          },
          {
             "id": "999",
             "name": "as7-d-founder",
             "mdf": "\\atlas\\as7-d-founder.mdf"
          }
       ],
       "weapons": [
          {
             "id": "1000",
             "name": "AutoCannon20",
             "weaponStats": {
                "health": "10",
                "slots": "10",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "20",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "6.0",
                "cooldown": "4.0",
                "ammoType": "AC20Ammo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "270",
                "maxRange": "810",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "750",
                "volleydelay": "0",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1001",
             "name": "MediumLaser",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "5",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "4.0",
                "cooldown": "3.0",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "270",
                "maxRange": "540",
                "duration": "1.0",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1002",
             "name": "LRM20",
             "weaponStats": {
                "health": "10",
                "slots": "5",
                "type": "2",
                "projectileclass": "javelin",
                "numFiring": "20",
                "damage": "1.8",
                "heatdamage": "0",
                "impulse": "0.8",
                "heat": "6.0",
                "cooldown": "4.75",
                "ammoType": "LRMAmmo",
                "ammoPerShot": "20",
                "minRange": "180",
                "longRange": "1000.0",
                "maxRange": "1000.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "100",
                "volleydelay": "0.5",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1003",
             "name": "SmallLaser",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "3",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "2.0",
                "cooldown": "2.25",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "90",
                "maxRange": "180",
                "duration": "0.75",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1004",
             "name": "SRM4",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "2",
                "projectileclass": "waypointrocket",
                "numFiring": "4",
                "damage": "2.5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "3",
                "cooldown": "3.75",
                "ammoType": "SRMAmmo",
                "ammoPerShot": "4",
                "minRange": "0",
                "longRange": "270.0",
                "maxRange": "270.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "300",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1005",
             "name": "ERLargeLaser",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "9",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "10.0",
                "cooldown": "3.25",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "675",
                "maxRange": "1350",
                "duration": "1.0",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1006",
             "name": "ERPPC",
             "weaponStats": {
                "health": "10",
                "slots": "3",
                "type": "1",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "10",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "13.0",
                "cooldown": "3",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "810",
                "maxRange": "1620",
                "duration": "0",
                "lifetime": "10",
                "speed": "1200",
                "volleydelay": "0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1007",
             "name": "Flamer",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "0.4",
                "heatdamage": "0.2",
                "impulse": "0.1",
                "heat": "0.6",
                "cooldown": "0.0",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "64.0",
                "maxRange": "64.0",
                "duration": "-1.0",
                "lifetime": "1.0",
                "speed": "100",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1008",
             "name": "LargeLaser",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "9",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "7.0",
                "cooldown": "3.25",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "450",
                "maxRange": "900",
                "duration": "1.0",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1009",
             "name": "PPC",
             "weaponStats": {
                "health": "10",
                "slots": "3",
                "type": "1",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "10",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "9.0",
                "cooldown": "3",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "90",
                "longRange": "540",
                "maxRange": "1080",
                "duration": "0",
                "lifetime": "10",
                "speed": "1200",
                "volleydelay": "0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1010",
             "name": "LargePulseLaser",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "10",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "9.0",
                "cooldown": "3.25",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "300",
                "maxRange": "600",
                "duration": "0.75",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1011",
             "name": "MediumPulseLaser",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "6",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "5.0",
                "cooldown": "3.0",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "180",
                "maxRange": "360",
                "duration": "0.75",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1012",
             "name": "SmallPulseLaser",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "3",
                "heatdamage": "0",
                "impulse": "0.1",
                "heat": "3.0",
                "cooldown": "2.25",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "90",
                "maxRange": "180",
                "duration": "0.5",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1014",
             "name": "Anti_Missile_System",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "4",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "2.0",
                "heatdamage": "0",
                "impulse": "0.001",
                "heat": "0.0",
                "cooldown": "0.0",
                "ammoType": "AMSAmmo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "90.0",
                "maxRange": "200.0",
                "duration": "-1.0",
                "lifetime": "1.0",
                "speed": "100",
                "volleydelay": "0",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1018",
             "name": "AutoCannon2",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "2",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "1.0",
                "cooldown": "0.5",
                "ammoType": "AC2Ammo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "720",
                "maxRange": "2160",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "2000",
                "volleydelay": "0",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1019",
             "name": "AutoCannon5",
             "weaponStats": {
                "health": "10",
                "slots": "4",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "1.0",
                "cooldown": "1.7",
                "ammoType": "AC5Ammo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "540",
                "maxRange": "1620",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "900",
                "volleydelay": "0",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1020",
             "name": "AutoCannon10",
             "weaponStats": {
                "health": "10",
                "slots": "7",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "10",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "3.0",
                "cooldown": "2.5",
                "ammoType": "AC10Ammo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "450",
                "maxRange": "1350",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "850",
                "volleydelay": "0",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1021",
             "name": "GaussRifle",
             "weaponStats": {
                "health": "3",
                "slots": "7",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "15",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "1.0",
                "cooldown": "4",
                "ammoType": "GaussAmmo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "660",
                "maxRange": "1980",
                "duration": "0.0",
                "lifetime": "10",
                "speed": "1200",
                "volleydelay": "0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1023",
             "name": "LB10XAutoCannon",
             "weaponStats": {
                "health": "10",
                "slots": "6",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "1",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "2.0",
                "cooldown": "2.5",
                "ammoType": "LB10-XACAmmo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "540",
                "maxRange": "1620",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "850",
                "volleydelay": "0",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1024",
             "name": "MachineGun",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "0",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "0.04",
                "heatdamage": "0",
                "impulse": "0.001",
                "heat": "0.0",
                "cooldown": "0.0",
                "ammoType": "MachineGunAmmo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "90.0",
                "maxRange": "200.0",
                "duration": "-1.0",
                "lifetime": "1.0",
                "speed": "100",
                "volleydelay": "0",
                "gravity": [],
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1025",
             "name": "UltraAutoCannon5",
             "weaponStats": {
                "health": "10",
                "slots": "5",
                "type": "0",
                "projectileclass": "bullet",
                "numFiring": "1",
                "damage": "5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "1.0",
                "cooldown": "1.1",
                "ammoType": "UltraAC5Ammo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "600",
                "maxRange": "1800",
                "duration": "0.0",
                "lifetime": "10.0",
                "speed": "900",
                "volleydelay": "0.5",
                "gravity": "0,0,-9.8",
                "maxDepth": "10.0"
             }
          },
          {
             "id": "1026",
             "name": "LRM5",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "2",
                "projectileclass": "javelin",
                "numFiring": "5",
                "damage": "1.8",
                "heatdamage": "0",
                "impulse": "0.8",
                "heat": "2.0",
                "cooldown": "3.25",
                "ammoType": "LRMAmmo",
                "ammoPerShot": "5",
                "minRange": "180",
                "longRange": "1000.0",
                "maxRange": "1000.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "100",
                "volleydelay": "0.5",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1027",
             "name": "LRM10",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "2",
                "projectileclass": "javelin",
                "numFiring": "10",
                "damage": "1.8",
                "heatdamage": "0",
                "impulse": "0.8",
                "heat": "4.0",
                "cooldown": "3.75",
                "ammoType": "LRMAmmo",
                "ammoPerShot": "10",
                "minRange": "180",
                "longRange": "1000.0",
                "maxRange": "1000.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "100",
                "volleydelay": "0.5",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1028",
             "name": "LRM15",
             "weaponStats": {
                "health": "10",
                "slots": "3",
                "type": "2",
                "projectileclass": "javelin",
                "numFiring": "15",
                "damage": "1.8",
                "heatdamage": "0",
                "impulse": "0.8",
                "heat": "5.0",
                "cooldown": "4.25",
                "ammoType": "LRMAmmo",
                "ammoPerShot": "15",
                "minRange": "180",
                "longRange": "1000.0",
                "maxRange": "1000.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "100",
                "volleydelay": "0.5",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1029",
             "name": "NarcBeacon",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "2",
                "projectileclass": "narc",
                "numFiring": "1",
                "damage": "0.0",
                "heatdamage": "0",
                "impulse": "0.0",
                "heat": "0",
                "cooldown": "3.5",
                "ammoType": "NARCAmmo",
                "ammoPerShot": "1",
                "minRange": "0",
                "longRange": "270.0",
                "maxRange": "270.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "250",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1030",
             "name": "SRM2",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "2",
                "projectileclass": "waypointrocket",
                "numFiring": "2",
                "damage": "2.5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "2",
                "cooldown": "3.5",
                "ammoType": "SRMAmmo",
                "ammoPerShot": "2",
                "minRange": "0",
                "longRange": "270.0",
                "maxRange": "270.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "300",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1031",
             "name": "SRM6",
             "weaponStats": {
                "health": "10",
                "slots": "2",
                "type": "2",
                "projectileclass": "waypointrocket",
                "numFiring": "6",
                "damage": "2.5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "4.0",
                "cooldown": "4.0",
                "ammoType": "SRMAmmo",
                "ammoPerShot": "6",
                "minRange": "0",
                "longRange": "270.0",
                "maxRange": "270.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "300",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1032",
             "name": "StreakSRM2",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "2",
                "projectileclass": "homingrocket",
                "numFiring": "2",
                "damage": "2.5",
                "heatdamage": "0",
                "impulse": "1.0",
                "heat": "2",
                "cooldown": "3.5",
                "ammoType": "StreakSRMAmmo",
                "ammoPerShot": "2",
                "minRange": "0",
                "longRange": "270.0",
                "maxRange": "270.0",
                "duration": "0.0",
                "lifetime": "15.0",
                "speed": "200",
                "volleydelay": "0.25",
                "gravity": [],
                "maxDepth": []
             }
          },
          {
             "id": "1037",
             "name": "TAG",
             "weaponStats": {
                "health": "10",
                "slots": "1",
                "type": "1",
                "projectileclass": [],
                "numFiring": "1",
                "damage": "0",
                "heatdamage": "0",
                "impulse": "0.0",
                "heat": "0.0",
                "cooldown": "0.0",
                "ammoType": [],
                "ammoPerShot": "0",
                "minRange": "0",
                "longRange": "450",
                "maxRange": "450",
                "duration": "-1.0",
                "lifetime": "0",
                "speed": "0",
                "volleydelay": "0.0",
                "gravity": [],
                "maxDepth": "0.0"
             }
          }
       ],
       "ammoTypes": [
          {
             "id": "2000",
             "name": "AC20Ammo",
             "ammoTypeStats": {
                "type": "AC20Ammo",
                "internalDamage": "20",
                "shotsPerTon": "7",
                "health": "10"
             }
          },
          {
             "id": "2001",
             "name": "AMSAmmo",
             "ammoTypeStats": {
                "type": "AMSAmmo",
                "internalDamage": "0.024",
                "shotsPerTon": "1000",
                "health": "10"
             }
          },
          {
             "id": "2005",
             "name": "AC2Ammo",
             "ammoTypeStats": {
                "type": "AC2Ammo",
                "internalDamage": "2",
                "shotsPerTon": "75",
                "health": "10"
             }
          },
          {
             "id": "2006",
             "name": "AC5Ammo",
             "ammoTypeStats": {
                "type": "AC5Ammo",
                "internalDamage": "5",
                "shotsPerTon": "30",
                "health": "10"
             }
          },
          {
             "id": "2007",
             "name": "AC10Ammo",
             "ammoTypeStats": {
                "type": "AC10Ammo",
                "internalDamage": "10",
                "shotsPerTon": "15",
                "health": "10"
             }
          },
          {
             "id": "2010",
             "name": "LB10-XACAmmo",
             "ammoTypeStats": {
                "type": "LB10-XACAmmo",
                "internalDamage": "10",
                "shotsPerTon": "15",
                "health": "10"
             }
          },
          {
             "id": "2011",
             "name": "MachineGunAmmo",
             "ammoTypeStats": {
                "type": "MachineGunAmmo",
                "internalDamage": "0.08",
                "shotsPerTon": "2000",
                "health": "10"
             }
          },
          {
             "id": "2008",
             "name": "GaussAmmo",
             "ammoTypeStats": {
                "type": "GaussAmmo",
                "internalDamage": "0",
                "shotsPerTon": "10",
                "health": "10"
             }
          },
          {
             "id": "2012",
             "name": "UltraAC5Ammo",
             "ammoTypeStats": {
                "type": "UltraAC5Ammo",
                "internalDamage": "5",
                "shotsPerTon": "25",
                "health": "10"
             }
          },
          {
             "id": "2017",
             "name": "NARCAmmo",
             "ammoTypeStats": {
                "type": "NARCAmmo",
                "internalDamage": "2",
                "shotsPerTon": "6",
                "health": "10"
             }
          },
          {
             "id": "2027",
             "name": "LRMAmmo",
             "ammoTypeStats": {
                "type": "LRMAmmo",
                "internalDamage": "1.6",
                "shotsPerTon": "180",
                "health": "10"
             }
          },
          {
             "id": "2028",
             "name": "SRMAmmo",
             "ammoTypeStats": {
                "type": "SRMAmmo",
                "internalDamage": "2.5",
                "shotsPerTon": "100",
                "health": "10"
             }
          },
          {
             "id": "2029",
             "name": "StreakSRMAmmo",
             "ammoTypeStats": {
                "type": "StreakSRMAmmo",
                "internalDamage": "2.5",
                "shotsPerTon": "100",
                "health": "10"
             }
          },
          {
             "id": "2030",
             "name": "LRMAmmoArtemis",
             "ammoTypeStats": {
                "type": "LRMAmmoArtemis",
                "internalDamage": "1.6",
                "shotsPerTon": "180",
                "health": "10"
             }
          },
          {
             "id": "2031",
             "name": "SRMAmmoArtemis",
             "ammoTypeStats": {
                "type": "SRMAmmoArtemis",
                "internalDamage": "2.5",
                "shotsPerTon": "100",
                "health": "10"
             }
          }
       ],
       "modules": [
          {
             "id": "1500",
             "name": "JumpJets_ClassI",
             "cType": "CJumpJetStats",
             "moduleStats": {
                "slots": "1",
                "tons": "2",
                "health": "10"
             },
             "jumpJetStats": {
                "cooldown": "1.0",
                "duration": "5.0",
                "boost_fwd": "0.1",
                "boost_z": "71.43",
                "heat": "0.1",
                "minTons": "90",
                "maxTons": "200"
             }
          },
          {
             "id": "1501",
             "name": "JumpJets_ClassII",
             "cType": "CJumpJetStats",
             "moduleStats": {
                "slots": "1",
                "tons": "1",
                "health": "10"
             },
             "jumpJetStats": {
                "cooldown": "1.0",
                "duration": "5.0",
                "boost_fwd": "0.1",
                "boost_z": "60.71",
                "heat": "0.1",
                "minTons": "80",
                "maxTons": "90"
             }
          },
          {
             "id": "1502",
             "name": "JumpJets_ClassIII",
             "cType": "CJumpJetStats",
             "moduleStats": {
                "slots": "1",
                "tons": "1",
                "health": "10"
             },
             "jumpJetStats": {
                "cooldown": "1.0",
                "duration": "5.0",
                "boost_fwd": "0.1",
                "boost_z": "53.6",
                "heat": "0.1",
                "minTons": "60",
                "maxTons": "80"
             }
          },
          {
             "id": "1503",
             "name": "JumpJets_ClassIV",
             "cType": "CJumpJetStats",
             "moduleStats": {
                "slots": "1",
                "tons": "0.5",
                "health": "10"
             },
             "jumpJetStats": {
                "cooldown": "1.0",
                "duration": "5.0",
                "boost_fwd": "0.1",
                "boost_z": "39.3",
                "heat": "0.1",
                "minTons": "40",
                "maxTons": "60"
             }
          },
          {
             "id": "1504",
             "name": "JumpJets_ClassV",
             "cType": "CJumpJetStats",
             "moduleStats": {
                "slots": "1",
                "tons": "0.5",
                "health": "10"
             },
             "jumpJetStats": {
                "cooldown": "1.0",
                "duration": "5.0",
                "boost_fwd": "0.1",
                "boost_z": "25",
                "heat": "0.1",
                "minTons": "20",
                "maxTons": "40"
             }
          },
          {
             "id": "3000",
             "name": "HeatSink_MkI",
             "cType": "CHeatSinkStats",
             "moduleStats": {
                "slots": "1",
                "tons": "1",
                "health": "10"
             },
             "heatSinkStats": {
                "cooling": "0.1",
                "heatbase": "-1.0"
             }
          },
          {
             "id": "3001",
             "name": "DoubleHeatSink_MkI",
             "cType": "CHeatSinkStats",
             "moduleStats": {
                "slots": "3",
                "tons": "1",
                "health": "10"
             },
             "heatSinkStats": {
                "cooling": "0.14",
                "heatbase": "-1.4"
             }
          },
          {
             "id": "3218",
             "name": "Engine_Std_100",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "100",
                "weight": "1.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3219",
             "name": "Engine_Std_105",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "105",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3220",
             "name": "Engine_Std_110",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "110",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3221",
             "name": "Engine_Std_115",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "115",
                "weight": "3.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3222",
             "name": "Engine_Std_120",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "120",
                "weight": "3.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3223",
             "name": "Engine_Std_125",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "125",
                "weight": "4.0",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3224",
             "name": "Engine_Std_130",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "130",
                "weight": "4.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3225",
             "name": "Engine_Std_135",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "135",
                "weight": "4.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3226",
             "name": "Engine_Std_140",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "140",
                "weight": "5.0",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3227",
             "name": "Engine_Std_145",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "145",
                "weight": "5.0",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3228",
             "name": "Engine_Std_150",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "150",
                "weight": "6.5",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3229",
             "name": "Engine_Std_155",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "155",
                "weight": "6.5",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3230",
             "name": "Engine_Std_160",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "160",
                "weight": "7",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3231",
             "name": "Engine_Std_165",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "165",
                "weight": "7",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3232",
             "name": "Engine_Std_170",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "170",
                "weight": "7",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3233",
             "name": "Engine_Std_175",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "175",
                "weight": "9",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3234",
             "name": "Engine_Std_180",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "180",
                "weight": "9",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3235",
             "name": "Engine_Std_185",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "185",
                "weight": "9.5",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3236",
             "name": "Engine_Std_190",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "190",
                "weight": "9.5",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3237",
             "name": "Engine_Std_195",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "195",
                "weight": "10",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3238",
             "name": "Engine_Std_200",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "200",
                "weight": "11.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3239",
             "name": "Engine_Std_205",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "205",
                "weight": "12.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3240",
             "name": "Engine_Std_210",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "210",
                "weight": "13",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3241",
             "name": "Engine_Std_215",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "215",
                "weight": "13.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3242",
             "name": "Engine_Std_220",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "220",
                "weight": "14",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3243",
             "name": "Engine_Std_225",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "225",
                "weight": "15",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3244",
             "name": "Engine_Std_230",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "230",
                "weight": "15.5",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3245",
             "name": "Engine_Std_235",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "235",
                "weight": "16",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3246",
             "name": "Engine_Std_240",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "240",
                "weight": "16.5",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3247",
             "name": "Engine_Std_245",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "245",
                "weight": "17",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3248",
             "name": "Engine_Std_250",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "250",
                "weight": "18.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3249",
             "name": "Engine_Std_255",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "255",
                "weight": "19",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3250",
             "name": "Engine_Std_260",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "260",
                "weight": "19.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3251",
             "name": "Engine_Std_265",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "265",
                "weight": "20",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3252",
             "name": "Engine_Std_270",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "270",
                "weight": "20.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3253",
             "name": "Engine_Std_275",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "275",
                "weight": "21.5",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3254",
             "name": "Engine_Std_280",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "280",
                "weight": "22",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3255",
             "name": "Engine_Std_285",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "285",
                "weight": "22.5",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3256",
             "name": "Engine_Std_290",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "290",
                "weight": "23.5",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3257",
             "name": "Engine_Std_295",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "295",
                "weight": "24",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3258",
             "name": "Engine_Std_300",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "300",
                "weight": "25.0",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3259",
             "name": "Engine_Std_305",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "305",
                "weight": "26.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3260",
             "name": "Engine_Std_310",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "310",
                "weight": "27.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3261",
             "name": "Engine_Std_315",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "315",
                "weight": "28.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3262",
             "name": "Engine_Std_320",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "320",
                "weight": "29.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3263",
             "name": "Engine_Std_325",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "325",
                "weight": "30.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3264",
             "name": "Engine_Std_330",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "330",
                "weight": "31.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3265",
             "name": "Engine_Std_335",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "335",
                "weight": "32.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3266",
             "name": "Engine_Std_340",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "340",
                "weight": "34",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3267",
             "name": "Engine_Std_345",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "345",
                "weight": "35.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3268",
             "name": "Engine_Std_350",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "350",
                "weight": "36.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3269",
             "name": "Engine_Std_355",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "355",
                "weight": "38.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3270",
             "name": "Engine_Std_360",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "360",
                "weight": "40",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3271",
             "name": "Engine_Std_365",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "365",
                "weight": "41.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3272",
             "name": "Engine_Std_370",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "370",
                "weight": "43.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3273",
             "name": "Engine_Std_375",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "375",
                "weight": "45.5",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3274",
             "name": "Engine_Std_380",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "380",
                "weight": "48",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3275",
             "name": "Engine_Std_385",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "385",
                "weight": "50.5",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3276",
             "name": "Engine_Std_390",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "390",
                "weight": "53",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3277",
             "name": "Engine_Std_395",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "395",
                "weight": "56",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3278",
             "name": "Engine_Std_400",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "400",
                "weight": "59.5",
                "type": "0",
                "heatsinks": "16",
                "health": "15"
             }
          },
          {
             "id": "3318",
             "name": "Engine_XL_100",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "100",
                "weight": "0.5",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3319",
             "name": "Engine_XL_105",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "105",
                "weight": "1.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3320",
             "name": "Engine_XL_110",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "110",
                "weight": "1.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3321",
             "name": "Engine_XL_115",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "115",
                "weight": "1.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3322",
             "name": "Engine_XL_120",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "120",
                "weight": "1.0",
                "type": "0",
                "heatsinks": "4",
                "health": "15"
             }
          },
          {
             "id": "3323",
             "name": "Engine_XL_125",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "125",
                "weight": "2.0",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3324",
             "name": "Engine_XL_130",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "130",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3325",
             "name": "Engine_XL_135",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "135",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3326",
             "name": "Engine_XL_140",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "140",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3327",
             "name": "Engine_XL_145",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "145",
                "weight": "2.5",
                "type": "0",
                "heatsinks": "5",
                "health": "15"
             }
          },
          {
             "id": "3328",
             "name": "Engine_XL_150",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "150",
                "weight": "4.0",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3329",
             "name": "Engine_XL_155",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "155",
                "weight": "4.0",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3330",
             "name": "Engine_XL_160",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "160",
                "weight": "4.0.",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3331",
             "name": "Engine_XL_165",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "165",
                "weight": "4.0",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3332",
             "name": "Engine_XL_170",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "170",
                "weight": "4.0",
                "type": "0",
                "heatsinks": "6",
                "health": "15"
             }
          },
          {
             "id": "3333",
             "name": "Engine_XL_175",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "175",
                "weight": "5.5",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3334",
             "name": "Engine_XL_180",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "180",
                "weight": "5.5",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3335",
             "name": "Engine_XL_185",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "185",
                "weight": "6",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3336",
             "name": "Engine_XL_190",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "190",
                "weight": "6",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3337",
             "name": "Engine_XL_195",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "195",
                "weight": "6",
                "type": "0",
                "heatsinks": "7",
                "health": "15"
             }
          },
          {
             "id": "3338",
             "name": "Engine_XL_200",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "200",
                "weight": "7.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3339",
             "name": "Engine_XL_205",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "205",
                "weight": "8.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3340",
             "name": "Engine_XL_210",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "210",
                "weight": "8.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3341",
             "name": "Engine_XL_215",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "215",
                "weight": "9",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3342",
             "name": "Engine_XL_220",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "220",
                "weight": "9",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          },
          {
             "id": "3343",
             "name": "Engine_XL_225",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "225",
                "weight": "10",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3344",
             "name": "Engine_XL_230",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "230",
                "weight": "10.5",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3345",
             "name": "Engine_XL_235",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "235",
                "weight": "10.5",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3346",
             "name": "Engine_XL_240",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "240",
                "weight": "11",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3347",
             "name": "Engine_XL_245",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "245",
                "weight": "11",
                "type": "0",
                "heatsinks": "9",
                "health": "15"
             }
          },
          {
             "id": "3348",
             "name": "Engine_XL_250",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "250",
                "weight": "12.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3349",
             "name": "Engine_XL_255",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "255",
                "weight": "12.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3350",
             "name": "Engine_XL_260",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "260",
                "weight": "13",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3351",
             "name": "Engine_XL_265",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "265",
                "weight": "13",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3352",
             "name": "Engine_XL_270",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "270",
                "weight": "13.5",
                "type": "0",
                "heatsinks": "10",
                "health": "15"
             }
          },
          {
             "id": "3353",
             "name": "Engine_XL_275",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "275",
                "weight": "14",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3354",
             "name": "Engine_XL_280",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "280",
                "weight": "14",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3355",
             "name": "Engine_XL_285",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "285",
                "weight": "14.5",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3356",
             "name": "Engine_XL_290",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "290",
                "weight": "15",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3357",
             "name": "Engine_XL_295",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "295",
                "weight": "15",
                "type": "0",
                "heatsinks": "11",
                "health": "15"
             }
          },
          {
             "id": "3358",
             "name": "Engine_XL_300",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "300",
                "weight": "15.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3359",
             "name": "Engine_XL_305",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "305",
                "weight": "17",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3360",
             "name": "Engine_XL_310",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "310",
                "weight": "17.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3361",
             "name": "Engine_XL_315",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "315",
                "weight": "18",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3362",
             "name": "Engine_XL_320",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "320",
                "weight": "18.5",
                "type": "0",
                "heatsinks": "12",
                "health": "15"
             }
          },
          {
             "id": "3363",
             "name": "Engine_XL_325",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "325",
                "weight": "19",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3364",
             "name": "Engine_XL_330",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "330",
                "weight": "19.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3365",
             "name": "Engine_XL_335",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "335",
                "weight": "20",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3366",
             "name": "Engine_XL_340",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "340",
                "weight": "20.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3367",
             "name": "Engine_XL_345",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "345",
                "weight": "21.5",
                "type": "0",
                "heatsinks": "13",
                "health": "15"
             }
          },
          {
             "id": "3368",
             "name": "Engine_XL_350",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "350",
                "weight": "22",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3369",
             "name": "Engine_XL_355",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "355",
                "weight": "23",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3370",
             "name": "Engine_XL_360",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "360",
                "weight": "23.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3371",
             "name": "Engine_XL_365",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "365",
                "weight": "24.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3372",
             "name": "Engine_XL_370",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "370",
                "weight": "25.5",
                "type": "0",
                "heatsinks": "14",
                "health": "15"
             }
          },
          {
             "id": "3373",
             "name": "Engine_XL_375",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "375",
                "weight": "27.5",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3374",
             "name": "Engine_XL_380",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "380",
                "weight": "27.5",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3375",
             "name": "Engine_XL_385",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "385",
                "weight": "29",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3376",
             "name": "Engine_XL_390",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "390",
                "weight": "30",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3377",
             "name": "Engine_XL_395",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "395",
                "weight": "31.5",
                "type": "0",
                "heatsinks": "15",
                "health": "15"
             }
          },
          {
             "id": "3378",
             "name": "Engine_XL_400",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "12",
                "rating": "400",
                "weight": "33.5",
                "type": "0",
                "heatsinks": "16",
                "health": "15"
             }
          },
          {
             "id": "4002",
             "name": "Capture_Accelerator_Module",
             "cType": "CPilotModule",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "pilotModuleStats": {
                "talentid": "ePTCaptureAccelerator"
             }
          },
          {
             "id": "4005",
             "name": "Advanced_Zoom_Module",
             "cType": "CPilotModule",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "pilotModuleStats": {
                "talentid": "ePTAdvanceZoom"
             }
          },
          {
             "id": "4017",
             "name": "Sensor_Range",
             "cType": "CPilotModule",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "pilotModuleStats": {
                "talentid": "ePTSensorRange"
             }
          },
          {
             "id": "4018",
             "name": "Target_Info_Gather_Module",
             "cType": "CPilotModule",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "pilotModuleStats": {
                "talentid": "ePTTargetInfoGathering"
             }
          },
          {
             "id": "4022",
             "name": "Back_Facing_Target_Retention",
             "cType": "CPilotModule",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "pilotModuleStats": {
                "talentid": "ePTBFacingTargetRetention"
             }
          },
          {
             "id": "9001",
             "name": "ArtemisIV",
             "cType": "CArtemisIVStats",
             "moduleStats": {
                "slots": "1",
                "tons": "1.0",
                "health": "0"
             },
             "artemisStats": {
                "lockTime": "0.5",
                "trackingStrength": "1.5",
                "missileSpread": "0.8"
             }
          },
          {
             "id": "9002",
             "name": "BeagleProbe",
             "cType": "CBAPStats",
             "moduleStats": {
                "slots": "2",
                "tons": "1.5",
                "health": "0"
             }
          },
          {
             "id": "9003",
             "name": "CASE",
             "cType": "CCASEStats",
             "moduleStats": {
                "slots": "1",
                "tons": "0.5",
                "health": "0"
             }
          },
          {
             "id": "9006",
             "name": "GuardianECM",
             "cType": "CGECMStats",
             "moduleStats": {
                "slots": "2",
                "tons": "1.5",
                "health": "0"
             }
          },
          {
             "id": "9012",
             "name": "CCC",
             "cType": "CDummyHeadStats",
             "moduleStats": {
                "slots": "1",
                "tons": "3.0",
                "health": "0"
             }
          }
       ]
    };


})(jQuery);