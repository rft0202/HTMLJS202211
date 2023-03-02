var x=false;
var caveData ={
	info:{
		layout:[
			[x,x,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1
			[x,x,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2
			[x,x,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0], //3
			[x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //4
			[x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //5
			[x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //6
			[x,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //7
			//[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //8
			
		],
		src:`images/theatertiles1.png`,
	},
	states:
	[		
			{ //black
				fps:5,
				cycle:false,
				frames:[
					{width:32, height:32, startX:0, startY:0}
				]
			},
			{ //red
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:36, startY:0}]
			},
			{ //gray
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:72, startY:0}]
			},
			{ //black2
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:108, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:160, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:192, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:224, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:256, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:32, height:32, startX:288, startY:0}]
			}
		]
	}
	var caveBackData ={
		info:{
			layout:[
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,3,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			],
			src:`images/theatertiles1.png`,
		},
		states:caveData.states
		}

		var caveHitData={
			info:{
				layout:[
				[x,x,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1
				[x,x,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2
				[x,x,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0], //3
				[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //4
				[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //5
				[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0,0,0,0], //6
				[x,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //7
					
					
				],
				src:`images/theatertiles1.png`,
			},
			states:caveData.states
			
			}