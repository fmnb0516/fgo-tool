fgo.data([
	{
		"servant": {
			"name": "アルトリア・ペンドラゴン",
			"clazz": "saber",
			"rare": 5,
			"cost": 16,
			"tenchizin": "chi"
		},
		"card": {
			"arts": {
				"count": 2,
				"hit": 2
			},
			"quick": {
				"count": 1,
				"hit": 2
			},
			"buster": {
				"count": 2,
				"hit": 1
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 15150,
				"atk": 11221
			},
			{
				"level": "100",
				"hp": 16597,
				"atk": 12283
			}
		],
		"hidden": {
			"na": 0.86,
			"staroccurrence": 10,
			"starcollection": 102,
			"dr": 21,
			"nd": 3,
			"tag": [
				"秩序",
				"善",
				"女",
				"騎乗",
				"人型",
				"竜",
				"アルトリア",
				"アーサー",
				"王",
				"サーヴァント"
			]
		},
		"classskill": [
			{
				"name": "対魔力A",
				"effect": [
					{
						"type": "弱体耐性アップ",
						"magnification": "20",
						"desc": "自身の弱体耐性をアップ"
					}
				]
			},
			{
				"name": "騎乗B",
				"effect": [
					{
						"type": "Quickカード性能アップ",
						"magnification": "8",
						"desc": "自身のQuickカードの性能をアップ"
					}
				]
			}
		],
		"skill1": {
			"name": "カリスマ B",
			"ct": 7,
			"effect": [
				{
					"type": "攻撃力アップ",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体の攻撃力をアップ[Lv](3T)",
					"v1": "9",
					"v2": "9.9",
					"v3": "10.8",
					"v4": "11.7",
					"v5": "12.6",
					"v6": "13.5",
					"v7": "14.4",
					"v8": "15.3",
					"v9": "16.2",
					"v10": "18"
				}
			]
		},
		"skill2": {
			"name": "魔力放出 A",
			"ct": 7,
			"effect": [
				{
					"type": "Busterカード性能アップ",
					"tern": 1,
					"count": 0,
					"target": "self",
					"desc": "自身のBusterカード性能をアップ[Lv](1T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				}
			]
		},
		"skill3": {
			"name": "輝ける路 EX",
			"ct": 7,
			"effect": [
				{
					"type": "スター獲得",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "スターを大量獲得[Lv]",
					"v1": "5",
					"v2": "6",
					"v3": "7",
					"v4": "8",
					"v5": "9",
					"v6": "10",
					"v7": "11",
					"v8": "12",
					"v9": "13",
					"v10": "15"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self",
					"desc": "NPを増やす[Lv]",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				}
			]
		},
		"hogu": {
			"name": "約束された勝利の剣",
			"type": "all",
			"card": "b",
			"hit": 1,
			"effect": [
				{
					"type": "攻撃",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "敵全体に強力な攻撃[Lv]",
					"v1": "400",
					"v2": "500",
					"v3": "550",
					"v4": "575",
					"v5": "600"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self",
					"beforeafter": "after",
					"lvoc": "oc",
					"desc": "自身のNPをリチャージ<OC:効果UP>",
					"v1": "20",
					"v2": "27.5",
					"v3": "35",
					"v4": "42.5",
					"v5": "50"
				}
			]
		}
	},
	{
		"servant": {
			"name": "諸葛孔明〔エルメロイⅡ世〕",
			"clazz": "caster",
			"rare": 5,
			"cost": 16,
			"tenchizin": "hito"
		},
		"card": {
			"arts": {
				"count": 3,
				"hit": 1
			},
			"quick": {
				"count": 1,
				"hit": 2
			},
			"buster": {
				"count": 1,
				"hit": 1
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 14259,
				"atk": 10598
			},
			{
				"level": "100",
				"hp": 15621,
				"atk": 11601
			}
		],
		"hidden": {
			"na": 1.64,
			"staroccurrence": 10.8,
			"starcollection": 50,
			"dr": 34.5,
			"nd": 3,
			"tag": [
				"中立",
				"善",
				"男",
				"サーヴァント",
				"人型",
				"愛する者"
			]
		},
		"classskill": [
			{
				"name": "陣地作成A",
				"effect": [
					{
						"type": "Artsカード性能アップ",
						"magnification": "10",
						"desc": "自身のArtsカードの性能をアップ"
					}
				]
			},
			{
				"name": "道具作成B",
				"effect": [
					{
						"type": "弱体耐性アップ",
						"magnification": "8",
						"desc": "自身の弱体付与成功率をアップ"
					}
				]
			}
		],
		"skill1": {
			"name": "鑑識眼 A",
			"ct": 7,
			"effect": [
				{
					"type": "クリティカル威力アップ",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のクリティカル威力をアップ[Lv](3T)",
					"v1": "20",
					"v2": "23",
					"v3": "26",
					"v4": "29",
					"v5": "32",
					"v6": "35",
					"v7": "38",
					"v8": "41",
					"v9": "44",
					"v10": "50"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "other-single",
					"desc": "NPを増やす",
					"v1": "30",
					"v2": "30",
					"v3": "30",
					"v4": "30",
					"v5": "30",
					"v6": "30",
					"v7": "30",
					"v8": "30",
					"v9": "30",
					"v10": "30"
				}
			]
		},
		"skill2": {
			"name": "軍師の忠言 A+",
			"ct": 8,
			"effect": [
				{
					"type": "防御力アップ",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体の防御力をアップ[Lv](3T)",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				},
				{
					"type": "ダメージカット付与",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "被ダメージカット状態を付与[Lv](3T)",
					"v1": "200",
					"v2": "230",
					"v3": "260",
					"v4": "290",
					"v5": "320",
					"v6": "350",
					"v7": "380",
					"v8": "410",
					"v9": "440",
					"v10": "500"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "NPを少し増やす",
					"v1": "10",
					"v2": "10",
					"v3": "10",
					"v4": "10",
					"v5": "10",
					"v6": "10",
					"v7": "10",
					"v8": "10",
					"v9": "10",
					"v10": "10"
				}
			]
		},
		"skill3": {
			"name": "軍師の指揮 A+",
			"ct": 8,
			"effect": [
				{
					"type": "攻撃力アップ",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体の攻撃力をアップ[Lv](3T)",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				},
				{
					"type": "与ダメージプラス付与",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "与ダメージプラス状態を付与[Lv](3T)",
					"v1": "200",
					"v2": "230",
					"v3": "260",
					"v4": "290",
					"v5": "320",
					"v6": "350",
					"v7": "380",
					"v8": "410",
					"v9": "440",
					"v10": "500"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "NPを少し増やす",
					"v1": "10",
					"v2": "10",
					"v3": "10",
					"v4": "10",
					"v5": "10",
					"v6": "10",
					"v7": "10",
					"v8": "10",
					"v9": "10",
					"v10": "10"
				}
			]
		},
		"hogu": {
			"name": "石兵八陣\t",
			"type": "support",
			"card": "a",
			"hit": 0,
			"effect": [
				{
					"type": "チャージ減",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "敵全体のチャージを減らす",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0"
				},
				{
					"type": "スタン付与",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "oc",
					"desc": "中確率でスタン状態を付与(1T)<OC:確率UP>",
					"v1": "50",
					"v2": "57.5",
					"v3": "65",
					"v4": "72.5",
					"v5": "80"
				},
				{
					"type": "呪い付与",
					"tern": 6,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "呪い状態を付与",
					"v1": "1000",
					"v2": "1000",
					"v3": "1000",
					"v4": "1000",
					"v5": "1000"
				},
				{
					"type": "防御力ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "防御力を大ダウン",
					"v1": "30",
					"v2": "40",
					"v3": "45",
					"v4": "47.5",
					"v5": "50"
				}
			]
		}
	},
	{
		"servant": {
			"name": "玉藻の前",
			"clazz": "caster",
			"rare": 5,
			"cost": 16,
			"tenchizin": "ten"
		},
		"card": {
			"arts": {
				"count": 3,
				"hit": 5
			},
			"quick": {
				"count": 1,
				"hit": 3
			},
			"buster": {
				"count": 1,
				"hit": 1
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 14259,
				"atk": 10546
			},
			{
				"level": "100",
				"hp": 15621,
				"atk": 11544
			}
		],
		"hidden": {
			"na": 0.32,
			"staroccurrence": 11,
			"starcollection": 49,
			"dr": 36,
			"nd": 3,
			"tag": [
				"中立",
				"悪",
				"女",
				"サーヴァント",
				"人型",
				"神性"
			]
		},
		"classskill": [
			{
				"name": "陣地作成C",
				"effect": [
					{
						"type": "Artsカード性能アップ",
						"magnification": "6",
						"desc": "自身のArtsカードの性能を少しアップ"
					}
				]
			},
			{
				"name": "神性A",
				"effect": [
					{
						"type": "与ダメージプラス付与",
						"magnification": "200",
						"desc": "自身に与ダメージプラス状態を付与"
					}
				]
			}
		],
		"skill1": {
			"name": "呪層・廣日照 A",
			"ct": 7,
			"effect": [
				{
					"type": "チャージ減",
					"tern": 0,
					"count": 0,
					"target": "enemy-single",
					"desc": "敵単体のチャージを高確率で減らす[Lv:確率]",
					"v1": "80",
					"v2": "82",
					"v3": "84",
					"v4": "86",
					"v5": "88",
					"v6": "90",
					"v7": "92",
					"v8": "94",
					"v9": "96",
					"v10": "100"
				},
				{
					"type": "宝具威力アップ",
					"tern": 3,
					"count": 0,
					"target": "other-all",
					"desc": "自身をのぞく味方全体の宝具威力をアップ[Lv](3T)",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				}
			]
		},
		"skill2": {
			"name": "変化 A",
			"ct": 7,
			"effect": [
				{
					"type": "防御力アップ",
					"tern": 1,
					"count": 0,
					"target": "self",
					"desc": "自身の防御力を大アップ(1T)",
					"v1": "30",
					"v2": "30",
					"v3": "30",
					"v4": "30",
					"v5": "30",
					"v6": "30",
					"v7": "30",
					"v8": "30",
					"v9": "30",
					"v10": "30"
				},
				{
					"type": "防御力アップ",
					"tern": 3,
					"count": 0,
					"target": "self",
					"desc": "防御力をアップ[Lv](3T)",
					"v1": "10",
					"v2": "12",
					"v3": "14",
					"v4": "16",
					"v5": "18",
					"v6": "20",
					"v7": "22",
					"v8": "24",
					"v9": "26",
					"v10": "30"
				}
			]
		},
		"skill3": {
			"name": "狐の嫁入り EX",
			"ct": 7,
			"effect": [
				{
					"type": "Artsカード性能アップ",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のArtsカード性能をアップ[Lv](3T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "HP回復",
					"tern": 0,
					"count": 0,
					"target": "other-single",
					"desc": "HPを回復[Lv]",
					"v1": "1000",
					"v2": "1150",
					"v3": "1300",
					"v4": "1450",
					"v5": "1600",
					"v6": "1750",
					"v7": "1900",
					"v8": "2050",
					"v9": "2200",
					"v10": "2500"
				}
			]
		},
		"hogu": {
			"name": "水天日光天照八野鎮石",
			"type": "support",
			"card": "a",
			"hit": 0,
			"effect": [
				{
					"type": "スキルチャージ",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "味方全体のスキルチャージを1進める",
					"v1": "1",
					"v2": "1",
					"v3": "1",
					"v4": "1",
					"v5": "1"
				},
				{
					"type": "HP回復",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "HPを回復",
					"v1": "2000",
					"v2": "2500",
					"v3": "2750",
					"v4": "2875",
					"v5": "3000"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "NPを増やす<OC:効果UP>",
					"v1": "25",
					"v2": "31.25",
					"v3": "37.5",
					"v4": "43.75",
					"v5": "50"
				}
			]
		}
	},
	{
		"servant": {
			"name": "巌窟王 エドモン・ダンテス",
			"clazz": "avenger",
			"rare": 5,
			"cost": 16,
			"tenchizin": "hito"
		},
		"card": {
			"arts": {
				"count": 1,
				"hit": 2
			},
			"quick": {
				"count": 2,
				"hit": 4
			},
			"buster": {
				"count": 2,
				"hit": 3
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 12177,
				"atk": 12641
			},
			{
				"level": "100",
				"hp": 13340,
				"atk": 13838
			}
		],
		"hidden": {
			"na": 0.62,
			"staroccurrence": 5.9,
			"starcollection": 30,
			"dr": 7,
			"nd": 5,
			"tag": [
				"混沌",
				"悪",
				"男",
				"サーヴァント",
				"人型"
			]
		},
		"classskill": [
			{
				"name": "復讐者A",
				"effect": [
					{
						"type": "被ダメ獲得量アップ",
						"magnification": "20",
						"desc": "自身の被ダメージ時に獲得するNPアップ"
					},
					{
						"type": "弱体耐性ダウン",
						"magnification": "10",
						"desc": "自身を除く味方全体<控え含む>の弱体耐性をダウン【デメリット"
					}
				]
			},
			{
				"name": "忘却補正B",
				"effect": [
					{
						"type": "クリティカル威力アップ",
						"magnification": "8",
						"desc": "自身のクリティカル威力をアップ"
					}
				]
			},
			{
				"name": "自己回復(魔力)D",
				"effect": [
					{
						"type": "NP増加",
						"magnification": "3",
						"desc": "自身に毎ターンNP獲得状態を付与"
					}
				]
			}
		],
		"skill1": {
			"name": "鋼鉄の決意 EX",
			"ct": 8,
			"effect": [
				{
					"type": "無敵貫通付与",
					"tern": 1,
					"count": 0,
					"target": "self",
					"desc": "自身に無敵貫通状態を付与(1T)",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0",
					"v6": "0",
					"v7": "0",
					"v8": "0",
					"v9": "0",
					"v10": "0"
				},
				{
					"type": "攻撃力アップ",
					"tern": 1,
					"count": 0,
					"target": "self",
					"desc": "攻撃力をアップ[Lv](1T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "弱体耐性アップ",
					"tern": 3,
					"count": 0,
					"target": "self",
					"desc": "弱体耐性をアップ[Lv](3T)",
					"v1": "14",
					"v2": "15.8",
					"v3": "17.6",
					"v4": "19.4",
					"v5": "21.2",
					"v6": "23",
					"v7": "24.8",
					"v8": "26.6",
					"v9": "28.4",
					"v10": "32"
				}
			]
		},
		"skill2": {
			"name": "黄金律 A",
			"ct": 8,
			"effect": [
				{
					"type": "NP獲得量アップ",
					"tern": 3,
					"count": 0,
					"target": "self",
					"desc": "自身のNP獲得量アップ[Lv](3T)",
					"v1": "20",
					"v2": "23",
					"v3": "26",
					"v4": "29",
					"v5": "32",
					"v6": "35",
					"v7": "38",
					"v8": "41",
					"v9": "44",
					"v10": "50"
				}
			]
		},
		"skill3": {
			"name": "窮地の智慧 A",
			"ct": 8,
			"effect": [
				{
					"type": "チャージ減",
					"tern": 0,
					"count": 0,
					"target": "enemy-single",
					"desc": "敵単体のチャージを減らす",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0",
					"v6": "0",
					"v7": "0",
					"v8": "0",
					"v9": "0",
					"v10": "0"
				},
				{
					"type": "弱体解除",
					"tern": 0,
					"count": 0,
					"target": "self",
					"desc": "自身の弱体状態を解除",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0",
					"v6": "0",
					"v7": "0",
					"v8": "0",
					"v9": "0",
					"v10": "0"
				},
				{
					"type": "スター獲得",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "スターを獲得[Lv]",
					"v1": "10",
					"v2": "11",
					"v3": "12",
					"v4": "13",
					"v5": "14",
					"v6": "15",
					"v7": "16",
					"v8": "17",
					"v9": "18",
					"v10": "20"
				}
			]
		},
		"hogu": {
			"name": "虎よ、煌々と燃え盛れ",
			"type": "all",
			"card": "q",
			"hit": 8,
			"effect": [
				{
					"type": "攻撃",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "敵全体に強力な攻撃[Lv]",
					"v1": "800",
					"v2": "1000",
					"v3": "1100",
					"v4": "1150",
					"v5": "1200"
				},
				{
					"type": "防御力ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "after",
					"lvoc": "oc",
					"desc": "防御力をダウン(3T)<OC:効果UP>",
					"v1": "20",
					"v2": "25",
					"v3": "30",
					"v4": "35",
					"v5": "40"
				},
				{
					"type": "呪い付与",
					"tern": 5,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "after",
					"lvoc": "oc",
					"desc": "呪い状態を付与(5T)<OC:効果UP>",
					"v1": "500",
					"v2": "750",
					"v3": "1000",
					"v4": "1250",
					"v5": "1500"
				},
				{
					"type": "呪厄付与",
					"tern": 5,
					"count": 0,
					"target": "self",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "呪災状態を付与(5T)",
					"v1": "100",
					"v2": "100",
					"v3": "100",
					"v4": "100",
					"v5": "100"
				}
			]
		}
	},
	{
		"servant": {
			"name": "マーリン",
			"clazz": "caster",
			"rare": 5,
			"cost": 16,
			"tenchizin": "chi"
		},
		"card": {
			"arts": {
				"count": 3,
				"hit": 2
			},
			"quick": {
				"count": 1,
				"hit": 3
			},
			"buster": {
				"count": 1,
				"hit": 5
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 14259,
				"atk": 10546
			},
			{
				"level": "100",
				"hp": 15621,
				"atk": 11544
			}
		],
		"hidden": {
			"na": 0.81,
			"staroccurrence": 10.8,
			"starcollection": 49,
			"dr": 36,
			"nd": 3,
			"tag": [
				"秩序",
				"善",
				"男",
				"サーヴァント",
				"人型"
			]
		},
		"classskill": [
			{
				"name": "陣地作成C",
				"effect": [
					{
						"type": "Artsカード性能アップ",
						"magnification": "6",
						"desc": "自身のArtsカードの性能を少しアップ"
					}
				]
			},
			{
				"name": "道具作成C",
				"effect": [
					{
						"type": "弱体付与成功率アップ",
						"magnification": "6",
						"desc": "自身の弱体付与成功率を少しアップ"
					}
				]
			},
			{
				"name": "混血EX",
				"effect": [
					{
						"type": "NP増加",
						"magnification": "5",
						"desc": "自身に毎ターンNP獲得状態を付与"
					}
				]
			}
		],
		"skill1": {
			"name": "夢幻のカリスマ A",
			"ct": 7,
			"effect": [
				{
					"type": "攻撃力アップ",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体の攻撃力をアップ[Lv](3T)",
					"v1": "10",
					"v2": "11",
					"v3": "12",
					"v4": "13",
					"v5": "14",
					"v6": "15",
					"v7": "16",
					"v8": "17",
					"v9": "18",
					"v10": "20"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "NPを増やす",
					"v1": "20",
					"v2": "20",
					"v3": "20",
					"v4": "20",
					"v5": "20",
					"v6": "20",
					"v7": "20",
					"v8": "20",
					"v9": "20",
					"v10": "20"
				}
			]
		},
		"skill2": {
			"name": "幻術 A",
			"ct": 9,
			"effect": [
				{
					"type": "無敵付与",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体に無敵状態を付与(1T)",
					"v1": "",
					"v2": "",
					"v3": "",
					"v4": "",
					"v5": "",
					"v6": "",
					"v7": "",
					"v8": "",
					"v9": "",
					"v10": ""
				},
				{
					"type": "スター発生率アップ",
					"tern": 1,
					"count": 0,
					"target": "self-other",
					"desc": "スター発生率をアップ[Lv](1T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "クリティカル発生率ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"desc": "敵全体のクリティカル発生率をダウン(3T)",
					"v1": "10",
					"v2": "11",
					"v3": "12",
					"v4": "13",
					"v5": "14",
					"v6": "15",
					"v7": "16",
					"v8": "17",
					"v9": "18",
					"v10": "20"
				}
			]
		},
		"skill3": {
			"name": "英雄作成 EX",
			"ct": 8,
			"effect": [
				{
					"type": "Busterカード性能アップ",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のBusterカード性能をアップ[Lv](3T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "最大HP増加",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "最大HPを増やす[Lv](3T)",
					"v1": "2000",
					"v2": "2100",
					"v3": "2200",
					"v4": "2300",
					"v5": "2400",
					"v6": "2500",
					"v7": "2600",
					"v8": "2700",
					"v9": "2800",
					"v10": "3000"
				},
				{
					"type": "クリティカル威力アップ",
					"tern": 1,
					"count": 0,
					"target": "other-single",
					"desc": "クリティカル威力をアップ[Lv](1T)",
					"v1": "50",
					"v2": "55",
					"v3": "60",
					"v4": "65",
					"v5": "70",
					"v6": "75",
					"v7": "80",
					"v8": "85",
					"v9": "90",
					"v10": "100"
				}
			]
		},
		"hogu": {
			"name": "永久に閉ざされた理想郷",
			"type": "support",
			"card": "a",
			"hit": 0,
			"effect": [
				{
					"type": "HP回復",
					"tern": 5,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "味方全体に毎ターンHP回復状態を付与[Lv](5T)",
					"v1": "1000",
					"v2": "1500",
					"v3": "1750",
					"v4": "1875",
					"v5": "2000"
				},
				{
					"type": "NP増加",
					"tern": 5,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "毎ターンNP獲得状態を付与(5T)",
					"v1": "5",
					"v2": "5",
					"v3": "5",
					"v4": "5",
					"v5": "5"
				},
				{
					"type": "スター獲得",
					"tern": 5,
					"count": 0,
					"target": "self",
					"beforeafter": "before",
					"lvoc": "oc",
					"desc": "自身に毎ターンスター獲得状態を付与(5T)<OC:効果UP>",
					"v1": "5",
					"v2": "10",
					"v3": "15",
					"v4": "20",
					"v5": "25"
				}
			]
		}
	},
	{
		"servant": {
			"name": "スカサハ＝スカディ",
			"clazz": "caster",
			"rare": 5,
			"cost": 16,
			"tenchizin": "ten"
		},
		"card": {
			"arts": {
				"count": 2,
				"hit": 3
			},
			"quick": {
				"count": 2,
				"hit": 4
			},
			"buster": {
				"count": 1,
				"hit": 4
			}
		},
		"status": [
			{
				"level": "90",
				"hp": 14406,
				"atk": 10753
			},
			{
				"level": "100",
				"hp": 15782,
				"atk": 11771
			}
		],
		"hidden": {
			"na": 0.67,
			"staroccurrence": 10.8,
			"starcollection": 49,
			"dr": 30,
			"nd": 3,
			"tag": [
				"混沌",
				"善",
				"女性",
				"サーヴァント",
				"人型",
				"神性",
				"王"
			]
		},
		"classskill": [
			{
				"name": "陣地作成EX",
				"effect": [
					{
						"type": "Artsカード性能アップ",
						"magnification": "12",
						"desc": "自身のArtsカードの性能をアップ"
					}
				]
			},
			{
				"name": "道具作成A",
				"effect": [
					{
						"type": "弱体付与成功率アップ",
						"magnification": "10",
						"desc": "自身の弱体付与成功率をアップ"
					}
				]
			},
			{
				"name": "女神の神核A",
				"effect": [
					{
						"type": "与ダメージプラス付与",
						"magnification": "250",
						"desc": "自身に与ダメージプラス状態を付与"
					},
					{
						"type": "弱体耐性アップ",
						"magnification": "25",
						"desc": "自身の弱体耐性をアップ"
					}
				]
			}
		],
		"skill1": {
			"name": "原初のルーン",
			"ct": 8,
			"effect": [
				{
					"type": "Quickカード性能アップ",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のQuickカード性能をアップ[Lv](3T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "(Qのみ)クリティカル威力アップ",
					"tern": 3,
					"count": 0,
					"target": "other-single",
					"desc": "Quickカードのクリティカル威力をアップ[Lv](3T)",
					"v1": "50",
					"v2": "55",
					"v3": "60",
					"v4": "65",
					"v5": "70",
					"v6": "75",
					"v7": "80",
					"v8": "85",
					"v9": "90",
					"v10": "100"
				}
			]
		},
		"skill2": {
			"name": "凍える吹雪 B",
			"ct": 8,
			"effect": [
				{
					"type": "防御力ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"desc": "敵全体の防御力をダウン[Lv](3T)",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				},
				{
					"type": "クリティカル発生率ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"desc": "クリティカル発生率をダウン[Lv](3T)",
					"v1": "20",
					"v2": "21",
					"v3": "22",
					"v4": "23",
					"v5": "24",
					"v6": "25",
					"v7": "26",
					"v8": "27",
					"v9": "28",
					"v10": "30"
				}
			]
		},
		"skill3": {
			"name": "大神の叡智 B",
			"ct": 8,
			"effect": [
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のNPを増やす[Lv]",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				}
			]
		},
		"hogu": {
			"name": "死溢るる魔境への門",
			"type": "support",
			"card": "a",
			"hit": 0,
			"effect": [
				{
					"type": "クリティカル威力アップ",
					"tern": 5,
					"count": 3,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "味方全体のクリティカル威力をアップ[Lv](3回・5T)",
					"v1": "30",
					"v2": "40",
					"v3": "45",
					"v4": "47.5",
					"v5": "50"
				},
				{
					"type": "回避付与",
					"tern": 3,
					"count": 1,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "回避状態を付与(1回・3T)",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0"
				},
				{
					"type": "即死無効付与",
					"tern": 3,
					"count": 1,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "即死無効状態を付与(1回・3T)",
					"v1": "0",
					"v2": "0",
					"v3": "0",
					"v4": "0",
					"v5": "0"
				},
				{
					"type": "ダメージカット付与",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"beforeafter": "before",
					"lvoc": "oc",
					"desc": "被ダメージカット状態を付与(3T)<OC:効果UP>",
					"v1": "500",
					"v2": "750",
					"v3": "1000",
					"v4": "1250",
					"v5": "1500"
				}
			]
		}
	},
	{
		"servant": {
			"name": "陳宮",
			"clazz": "caster",
			"rare": 2,
			"cost": 4,
			"tenchizin": "hito"
		},
		"card": {
			"arts": {
				"count": 3,
				"hit": 4
			},
			"quick": {
				"count": 1,
				"hit": 3
			},
			"buster": {
				"count": 1,
				"hit": 1
			}
		},
		"status": [
			{
				"level": "65",
				"hp": 7755,
				"atk": 6119
			},
			{
				"level": "70",
				"hp": 8246,
				"atk": 6511
			},
			{
				"level": "80",
				"hp": 9228,
				"atk": 7296
			},
			{
				"level": "90",
				"hp": 10210,
				"atk": 8082
			},
			{
				"level": "100",
				"hp": 11192,
				"atk": 8867
			}
		],
		"hidden": {
			"na": 0.4,
			"staroccurrence": 11,
			"starcollection": 49,
			"dr": 42,
			"nd": 3,
			"tag": [
				"混沌",
				"善",
				"男",
				"サーヴァント",
				"人型"
			]
		},
		"classskill": [
			{
				"name": "陣地作成C",
				"effect": [
					{
						"type": "Artsカード性能アップ",
						"magnification": "6",
						"desc": "自身のArtsカードの性能を少しアップ"
					}
				]
			},
			{
				"name": "道具作成B",
				"effect": [
					{
						"type": "弱体付与成功率アップ",
						"magnification": "8",
						"desc": "自身の弱体付与成功率をアップ"
					}
				]
			}
		],
		"skill1": {
			"name": "スケープゴート E",
			"ct": 7,
			"effect": [
				{
					"type": "ターゲット集中付与",
					"tern": 1,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体にターゲット集中状態を付与(1T)",
					"v1": "30",
					"v2": "30",
					"v3": "30",
					"v4": "30",
					"v5": "30",
					"v6": "30",
					"v7": "30",
					"v8": "30",
					"v9": "30",
					"v10": "30"
				},
				{
					"type": "クリティカル発生率ダウン",
					"tern": 3,
					"count": 0,
					"target": "enemy-all",
					"desc": "敵全体のクリティカル発生率をダウン[Lv](3T)",
					"v1": "10",
					"v2": "12",
					"v3": "14",
					"v4": "16",
					"v5": "18",
					"v6": "20",
					"v7": "22",
					"v8": "24",
					"v9": "26",
					"v10": "30"
				}
			]
		},
		"skill2": {
			"name": "軍師の忠言 B++",
			"ct": 8,
			"effect": [
				{
					"type": "防御力アップ",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "味方全体の防御力をアップ[Lv](3T)",
					"v1": "14",
					"v2": "15",
					"v3": "16",
					"v4": "17",
					"v5": "18",
					"v6": "19",
					"v7": "20",
					"v8": "21",
					"v9": "22",
					"v10": "24"
				},
				{
					"type": "ダメージカット付与",
					"tern": 3,
					"count": 0,
					"target": "self-other",
					"desc": "被ダメージカット状態を付与[Lv](3T)",
					"v1": "200",
					"v2": "215",
					"v3": "230",
					"v4": "245",
					"v5": "260",
					"v6": "275",
					"v7": "290",
					"v8": "305",
					"v9": "320",
					"v10": "350"
				},
				{
					"type": "NP増加",
					"tern": 0,
					"count": 0,
					"target": "self-other",
					"desc": "NPを少し増やす",
					"v1": "10",
					"v2": "10",
					"v3": "10",
					"v4": "10",
					"v5": "10",
					"v6": "10",
					"v7": "10",
					"v8": "10",
					"v9": "10",
					"v10": "10"
				}
			]
		},
		"skill3": {
			"name": "軍師の本懐 A",
			"ct": 7,
			"effect": [
				{
					"type": "Busterカード性能アップ",
					"tern": 1,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体のBusterカード性能をアップ[Lv](1T)",
					"v1": "30",
					"v2": "32",
					"v3": "34",
					"v4": "36",
					"v5": "38",
					"v6": "40",
					"v7": "42",
					"v8": "44",
					"v9": "46",
					"v10": "50"
				},
				{
					"type": "(狂のみ)クリティカル威力アップ",
					"tern": 1,
					"count": 0,
					"target": "other-single",
					"desc": "味方単体の〔バーサーカー〕のクリティカル威力をアップ[Lv](1T)",
					"v1": "50",
					"v2": "55",
					"v3": "60",
					"v4": "65",
					"v5": "70",
					"v6": "75",
					"v7": "80",
					"v8": "85",
					"v9": "90",
					"v10": "100"
				},
				{
					"type": "最大HP増加",
					"tern": 1,
					"count": 0,
					"target": "other-single",
					"desc": "最大HPを増やす[Lv](1T)",
					"v1": "2000",
					"v2": "2100",
					"v3": "2200",
					"v4": "2300",
					"v5": "2400",
					"v6": "2500",
					"v7": "2600",
					"v8": "2700",
					"v9": "2800",
					"v10": "3000"
				}
			]
		},
		"hogu": {
			"name": "掎角一陣",
			"type": "all",
			"card": "a",
			"hit": 4,
			"effect": [
				{
					"type": "攻撃",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "lv",
					"desc": "<生贄にできる味方がフィールドに1騎以上いる時のみ使用可能> 敵全体に超強力な攻撃[Lv]",
					"v1": "900",
					"v2": "1200",
					"v3": "1350",
					"v4": "1425",
					"v5": "1500"
				},
				{
					"type": "攻撃",
					"tern": 0,
					"count": 0,
					"target": "enemy-all",
					"beforeafter": "before",
					"lvoc": "oc",
					"desc": "<OC:威力アップ>",
					"v1": "0",
					"v2": "225",
					"v3": "450",
					"v4": "675",
					"v5": "900"
				},
				{
					"type": "即死",
					"tern": 0,
					"count": 0,
					"target": "other-single",
					"beforeafter": "after",
					"lvoc": "lv",
					"desc": "自身を除く味方単体を生贄にする(即死耐性無視の即死効果)【デメリット】 確率500％",
					"v1": "500",
					"v2": "500",
					"v3": "500",
					"v4": "500",
					"v5": "500"
				}
			]
		}
	}
])