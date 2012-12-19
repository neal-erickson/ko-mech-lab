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
    ]
}

})(jQuery);