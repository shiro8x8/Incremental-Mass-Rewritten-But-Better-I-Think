function setupHTML() {
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += `<div style="width: 130px">
			<button onclick="TABS.choose(${x})" class="btn_tab" id="tab${x}">${TABS[1][x].id}</button>
		</div>`
		if (TABS[2][x]) {
			table2 += `<div id="stabs${x}" class="table_center">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				table2 += `<div style="width: 130px">
					<button onclick="TABS.choose(${y}, true)" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
				</div>`
			}
			table2 += `</div>`
		}
	}
	tabs.setHTML(table)
	stabs.setHTML(table2)

	let ranks_table = new Element("ranks_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div style="width: 300px" id="ranks_div_${x}">
			<button id="ranks_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch('${rn}')">OFF</button>
			<span id="ranks_scale_${x}""></span>${RANKS.fullNames[x]} <span id="ranks_amt_${x}">X</span><br><br>
			<button onclick="RANKS.reset('${rn}')" class="btn reset" id="ranks_${x}">
				Reset your mass and upgrades, but <span id="ranks_desc_${x}">X</span><br>
				Req: <span id="ranks_req_${x}">X</span>
			</button>
		</div>`
	}
	ranks_table.setHTML(table)

	let mass_upgs_table = new Element("mass_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.mass.cols; x++) {
		let upg = UPGS.mass[x]
		table += `<div style="width: 100%; margin-bottom: 5px;" class="table_center" id="massUpg_div_${x}">
			<div style="width: 400px">
				<div class="resources">
					<img src="images/mass_upg${x}.png">
					<span style="margin-left: 5px; text-align: left;"><span id="massUpg_scale_${x}"></span>${upg.title} [<span id="massUpg_lvl_${x}">X</span>]</span>
				</div>
			</div><button id="massUpg_btn_${x}" class="btn" style="width: 200px;" onclick="UPGS.mass.buy(${x}, true)">Cost: <span id="massUpg_cost_${x}">X</span></button>
			<button class="btn" style="width: 120px;" onclick="UPGS.mass.buyMax(${x})">Buy Max</button>
			<button id="massUpg_auto_${x}" class="btn" style="width: 80px;" onclick="UPGS.mass.autoSwitch(${x})">OFF</button>
			<div style="margin-left: 5px; text-align: left; width: 400px">
				${upg.title} Power: <span id="massUpg_step_${x}">X</span><br>
				${upg.title} Effect: <span id="massUpg_eff_${x}">X</span>
			</div>
		</div>`
	}
	mass_upgs_table.setHTML(table)

	let ranks_rewards_table = new Element("ranks_rewards_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div id="ranks_reward_div_${x}">`
		let keys = Object.keys(RANKS.desc[rn])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="ranks_reward_${rn}_${y}"><b>${RANKS.fullNames[x]} ${keys[y]}:</b> ${RANKS.desc[rn][keys[y]]}${RANKS.effect[rn][keys[y]]?` Currently: <span id='ranks_eff_${rn}_${y}'></span></span>`:""}<br>`
		}
		table += `</div>`
	}
	ranks_rewards_table.setHTML(table)

	let main_upgs_table = new Element("main_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		table += `<div id="main_upg_${x}_div" style="width: 230px;"><b>${UPGS.main[x].title}</b><br><br><div class="table_center" style="justify-content: start;">`
		for (let y = 1; y <= UPGS.main[x].lens; y++) {
			let key = UPGS.main[x][y]
			table += `<img onclick="UPGS.main[${x}].buy(${y})" onmouseover="UPGS.main.over(${x},${y})" onmouseleave="UPGS.main.reset()"
			 style="margin: 3px;" class="img_btn" id="main_upg_${x}_${y}" src="images/main_upg_${id+y}.png">`
		}
		table += `</div></div>`
	}
	main_upgs_table.setHTML(table)

	let scaling_table = new Element("scaling_table")
	table = ""
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		table += `<div id="scaling_div_${x}">`
		let key = Object.keys(SCALE_START[SCALE_TYPE[x]])
		for (let y = 0; y < key.length; y++) {
			table += `<div id="scaling_${x}_${key[y]}_div" style="margin-bottom: 10px;"><b>${NAME_FROM_RES[key[y]]}</b> (<span id="scaling_${x}_${key[y]}_power"></span>): Starts at <span id="scaling_${x}_${key[y]}_start"></span></div>`
		}
		table += `</div>`
	}
	scaling_table.setHTML(table)

    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

function updateTabsHTML() {
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]
		tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
		tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: x == player.tab[0]})

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(x == player.tab[0])
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(x == player.tab[0])
			if (x == player.tab[0]) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == player.tab[1]})
				if (tmp.el["stab_frame"+y]) tmp.el["stab_frame"+y].setDisplay(y == player.tab[1])
			}
		}
	}
}

function updateUpperHTML() {
	tmp.el.mass.setHTML(formatMass(player.mass)+"<br>"+formatGain(player.mass, tmp.massGain, true))
	tmp.el.rpAmt.setHTML(format(player.rp.points,0)+"<br>(+"+format(FORMS.rp.gain(),0)+")")
	tmp.el.reset_desc.setHTML(player.reset_msg)
}

function updateRanksHTML() {
	for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
		let unl = RANKS.unl[rn]?RANKS.unl[rn]():true
		tmp.el["ranks_div_"+x].setDisplay(unl)
		if (unl) {
			tmp.el["ranks_scale_"+x].setTxt(getScalingName(rn))
			tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
			tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
			tmp.el["ranks_desc_"+x].setTxt(tmp.ranks[rn].desc,0)
			tmp.el["ranks_req_"+x].setTxt(x==0?formatMass(tmp.ranks[rn].req):RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
			tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
			tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
		}
    }
}

function updateMassUpgradesHTML() {
	for (let x = 1; x <= UPGS.mass.cols; x++) {
		let upg = UPGS.mass[x]
		tmp.el["massUpg_div_"+x].setDisplay(upg.unl())
		if (upg.unl()) {
			tmp.el["massUpg_scale_"+x].setTxt(getScalingName("massUpg", x))
			tmp.el["massUpg_lvl_"+x].setTxt(format(player.massUpg[x]||0,0)+(tmp.upgs.mass[x].bouns.gt(0)?" + "+format(tmp.upgs.mass[x].bouns,0):""))
			tmp.el["massUpg_btn_"+x].setClasses({btn: true, locked: player.mass.lt(tmp.upgs.mass[x].cost)})
			tmp.el["massUpg_cost_"+x].setTxt(formatMass(tmp.upgs.mass[x].cost))
			tmp.el["massUpg_step_"+x].setTxt(tmp.upgs.mass[x].effDesc.step)
			tmp.el["massUpg_eff_"+x].setTxt(tmp.upgs.mass[x].effDesc.eff)
			tmp.el["massUpg_auto_"+x].setDisplay(player.mainUpg.rp.includes(3))
			tmp.el["massUpg_auto_"+x].setTxt(player.autoMassUpg[x]?"ON":"OFF")
		}
	}
}

function updateTickspeedHTML() {
	let unl = player.rp.unl
	tmp.el.tickspeed_div.setDisplay(unl)
	if (unl) {
		tmp.el.tickspeed_lvl.setTxt(format(player.tickspeed,0))
		tmp.el.tickspeed_btn.setClasses({btn: true, locked: !FORMS.tickspeed.can()})
		tmp.el.tickspeed_cost.setTxt(format(FORMS.tickspeed.cost(),0))
		tmp.el.tickspeed_step.setTxt(tmp.tickspeedEffect.step.gte(10)?format(tmp.tickspeedEffect.step):format(tmp.tickspeedEffect.step.sub(1).mul(100))+"%")
		tmp.el.tickspeed_eff.setTxt(format(tmp.tickspeedEffect.eff))
	}
}

function updateRanksRewardHTML() {
	tmp.el["ranks_reward_name"].setTxt(RANKS.fullNames[player.ranks_reward])
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		tmp.el["ranks_reward_div_"+x].setDisplay(player.ranks_reward == x)
		if (player.ranks_reward == x) {
			let keys = Object.keys(RANKS.desc[rn])
			for (let y = 0; y < keys.length; y++) {
				let unl = player.ranks[rn].gte(keys[y])
				tmp.el["ranks_reward_"+rn+"_"+y].setDisplay(unl)
				if (unl) if (tmp.el["ranks_eff_"+rn+"_"+y]) tmp.el["ranks_eff_"+rn+"_"+y].setTxt(RANKS.effDesc[rn][keys[y]](RANKS.effect[rn][keys[y]]()))
			}
		}
	}
}

function updateMainUpgradesHTML() {
	if (player.main_upg_msg[0] != 0) {
		let upg1 = UPGS.main[player.main_upg_msg[0]]
		let upg2 = UPGS.main[player.main_upg_msg[0]][player.main_upg_msg[1]]
		let msg = upg2.desc+"<br>Cost: "+format(upg2.cost,0)+" "+upg1.res
		if (upg2.effDesc !== undefined) msg += "<br>Currently: "+tmp.upgs.main[player.main_upg_msg[0]][player.main_upg_msg[1]].effDesc
		tmp.el.main_upg_msg.setHTML(msg)
	} else tmp.el.main_upg_msg.setTxt("")
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		let unl = UPGS.main[x].unl()
		tmp.el["main_upg_"+x+"_div"].changeStyle("visibility", unl?"visible":"hidden")
		if (unl) {
			for (let y = 1; y <= UPGS.main[x].lens; y++) {
				tmp.el["main_upg_"+x+"_"+y].setClasses({img_btn: true, locked: !UPGS.main[x].can(y), bought: player.mainUpg[id].includes(y)})
			}
		}
	}
}

function updateHTML() {
	updateUpperHTML()
    updateTabsHTML()
	if (player.tab[0] == 0) {
		updateRanksHTML()
		updateMassUpgradesHTML()
		updateTickspeedHTML()
	}
	if (player.tab[0] == 1) {
		if (player.tab[1] == 0) updateRanksRewardHTML()
		if (player.tab[1] == 1) updateScalingHTML()
	}
	if (player.tab[0] == 2) {
		updateMainUpgradesHTML()
	}
}