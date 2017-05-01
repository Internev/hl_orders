const parseOrderForm = require('./utils')

test('parseOrderForm returns object', () => {
  // const lady87 = {}
  expect(1).toBe(1)
})

const exampleCSV = `83C05,60% Fine Merino Wool Ladies' Health Sock®,9,BLACK,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,10,BONE,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,19,BLACK BROWN,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,27,BURGUNDY,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,32,Apricot Orange,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,66,DENIM,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,69,NAVY,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,74,ANTELOPE,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,85,MID GREY,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,89,CHARCOAL,0,NONE,8.95
83C05,60% Fine Merino Wool Ladies' Health Sock®,96,NATURAL,0,NONE,8.95
83C07,60% Fine Merino Wool Ladies' Health Sock®,9,BLACK,0,NONE,8.95
83C07,60% Fine Merino Wool Ladies' Health Sock®,10,BONE,0,NONE,8.95
83C07,60% Fine Merino Wool Ladies' Health Sock®,19,BLACK BROWN,0,NONE,8.95
83C07,60% Fine Merino Wool Ladies' Health Sock®,25,RED,0,NONE,8.95
83C07,60% Fine Merino Wool Ladies' Health Sock®,69,NAVY,0,NONE,8.95
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,103,NAVY,10,SUNFLOWER,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,104,CHARCOAL,10,SUNFLOWER,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,105,BLACK,10,SUNFLOWER,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,351,BLACK,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,352,BONE,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,353,APRICOT ORANGE,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,354,NAVY,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,357,DARK GREY,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,358,NATURAL,35,AUTUMN,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,657,RED,W,SHEEP,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,662,ANTELOPE,W,SHEEP,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,663,NAVY,W,SHEEP,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,666,Antelope,K,KANGAROO,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,670,BLACK,K,KANGAROO,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,685,BONE,50,KOALALEAF,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,688,BLACK,50,KOALALEAF,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,689,RED,50,KOALALEAF,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,690,DARK BLUE,59,Parrot,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,693,Black,59,Parrot,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,818,DARK/LIGHT GREY,81,LaceVine,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,830,BLACK/TAUPE,83,HONEYCOMB,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,831,GREY/BLACK,83,HONEYCOMB,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,840,BLACK/TAUPE,84,LEAVES,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,841,GREY/BLACK,84,LEAVES,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,842,BONE/ANTELOPE,84,LEAVES,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,843,NAVY/DENIM,84,LEAVES,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,844,RED/GREY,84,LEAVES,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,868,CHARCOAL,80,3 BUDS,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,870,NATURAL,80,3 BUDS,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,871,ANTELOPE,80,3 BUDS,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,873,NAVY,80,3 BUDS,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,874,BLACK,80,3 BUDS,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,875,NAVY/BSTONE,81,LaceVine,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,876,BLACK/CHARCOAL,81,LaceVine,9.1
85C05,60% Fine Merino Wool Patterned Ladies' Health Sock®,877,CHOC/CAMEL,81,LaceVine,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,146,BLACK,14,DIAMONDEYE,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,147,NAVY,14,DIAMONDEYE,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,148,ANTELOPE,14,DIAMONDEYE,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,150,DKGREY/CHARCOAL,14,DIAMONDEYE,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,382,BLACK,38,DIMENSION,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,383,NAVY,38,DIMENSION,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,384,ANTELOPE,38,DIMENSION,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,657,RED,W,SHEEP,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,662,ANTELOPE,W,SHEEP,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,663,NAVY,W,SHEEP,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,666,Antelope,K,KANGAROO,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,670,BLACK,K,KANGAROO,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,685,BONE,50,KOALALEAF,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,688,BLACK,50,KOALALEAF,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,689,RED,50,KOALALEAF,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,690,DARK BLUE,59,Parrot,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,693,Black,59,Parrot,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,781,ANTELOPE,78,TRIPLE 3,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,782,DARK OLIVE,78,TRIPLE 3,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,783,NAVY,78,TRIPLE 3,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,784,CHARCOAL,78,TRIPLE 3,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,785,BLACK,78,TRIPLE 3,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,960,BLACK,96,RAIN,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,961,NAVY,96,RAIN,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,962,ANTELOPE,96,RAIN,9.1
85C07,60% Fine Merino Wool Patterned Men's Health Sock®,963,GABOLIVE,96,RAIN,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,146,BLACK,14,DIAMONDEYE,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,147,NAVY,14,DIAMONDEYE,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,148,ANTELOPE,14,DIAMONDEYE,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,150,DKGREY/CHARCOAL,14,DIAMONDEYE,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,382,BLACK,38,DIMENSION,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,383,NAVY,38,DIMENSION,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,384,ANTELOPE,38,DIMENSION,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,657,RED,W,SHEEP,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,662,ANTELOPE,W,SHEEP,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,663,NAVY,W,SHEEP,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,666,Antelope,K,KANGAROO,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,670,BLACK,K,KANGAROO,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,685,BONE,50,KOALALEAF,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,688,BLACK,50,KOALALEAF,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,689,RED,50,KOALALEAF,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,690,DARK BLUE,59,Parrot,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,693,Black,59,Parrot,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,781,ANTELOPE,78,TRIPLE 3,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,782,DARK OLIVE,78,TRIPLE 3,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,783,NAVY,78,TRIPLE 3,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,784,CHARCOAL,78,TRIPLE 3,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,785,BLACK,78,TRIPLE 3,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,960,BLACK,96,RAIN,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,961,NAVY,96,RAIN,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,962,ANTELOPE,96,RAIN,9.1
85C10,60% Fine Merino Wool Patterned Men's Health Sock®,963,GABOLIVE,96,RAIN,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,103,NAVY,10,SUNFLOWER,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,104,CHARCOAL,10,SUNFLOWER,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,105,BLACK,10,SUNFLOWER,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,351,BLACK,35,AUTUMN,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,352,BONE,35,AUTUMN,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,354,NAVY,35,AUTUMN,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,830,BLACK/TAUPE,83,HONEYCOMB,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,831,GREY/BLACK,83,HONEYCOMB,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,840,BLACK/TAUPE,84,LEAVES,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,841,GREY/BLACK,84,LEAVES,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,842,BONE/ANTELOPE,84,LEAVES,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,843,NAVY/DENIM,84,LEAVES,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,844,RED/GREY,84,LEAVES,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,868,CHARCOAL,80,3 BUDS,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,870,NATURAL,80,3 BUDS,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,871,ANTELOPE,80,3 BUDS,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,873,NAVY,80,3 BUDS,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,874,BLACK,80,3 BUDS,9.1
85CL7,60% Fine Merino Wool Patterned Ladies' Health Sock®,876,BLACK/CHARCOAL,81,LaceVine,9.1
86C07,60% Fine Merino Wool Men's Health Sock®,9,BLACK,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,10,BONE,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,19,BLACK BROWN,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,25,RED,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,69,NAVY,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,74,ANTELOPE,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,80,LIGHT GREY,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,89,CHARCOAL,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,516,MID KHAKI,0,NONE,8.95
86C07,60% Fine Merino Wool Men's Health Sock®,746,DARK OLIVE,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,9,BLACK,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,10,BONE,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,19,BLACK BROWN,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,25,RED,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,69,NAVY,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,74,ANTELOPE,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,80,LIGHT GREY,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,89,CHARCOAL,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,516,MID KHAKI,0,NONE,8.95
86C10,60% Fine Merino Wool Men's Health Sock®,746,DARK OLIVE,0,NONE,8.95
86H05,61% Fine Merino Wool Half Hose Ladies' Sock,9,BLACK,0,NONE,10.25
86H05,61% Fine Merino Wool Half Hose Ladies' Sock,10,BONE,0,NONE,10.25
86H05,61% Fine Merino Wool Half Hose Ladies' Sock,25,RED,0,NONE,10.25
86H05,61% Fine Merino Wool Half Hose Ladies' Sock,69,NAVY,0,NONE,10.25
86H05,61% Fine Merino Wool Half Hose Ladies' Sock,85,MID GREY,0,NONE,10.25
86H07,61% Fine Merino Wool Half Hose Ladies' Sock,9,BLACK,0,NONE,10.25
86H07,61% Fine Merino Wool Half Hose Ladies' Sock,25,RED,0,NONE,10.25
86H07,61% Fine Merino Wool Half Hose Ladies' Sock,85,MID GREY,0,NONE,10.25
86IN5,Soft Merino wool blend Invisible sock,9,BLACK,0,NONE,8
86IN5,Soft Merino wool blend Invisible sock,10,BONE,0,NONE,8
86IN6,Soft Merino wool blend Invisible sock,9,BLACK,0,NONE,8
86IN6,Soft Merino wool blend Invisible sock,10,BONE,0,NONE,8
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,9,BLACK,0,NONE,10.6
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,10,BONE,0,NONE,10.6
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,18,CHOCOLATE,0,NONE,10.6
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,69,NAVY,0,NONE,10.6
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,74,ANTELOPE,0,NONE,10.6
87C05,70% Fine Merino Wool Cushion Sole Ladies' Health Sock®,89,CHARCOAL,0,NONE,10.6
87C07,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,9,BLACK,0,NONE,10.6
87C07,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,69,NAVY,0,NONE,10.6
87C07,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,74,ANTELOPE,0,NONE,10.6
87C07,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,89,CHARCOAL,0,NONE,10.6
87C10,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,9,BLACK,0,NONE,10.6
87C10,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,69,NAVY,0,NONE,10.6
87C10,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,74,ANTELOPE,0,NONE,10.6
87C10,70% Fine Merino Wool Cushion Sole Mens' Health Sock®,89,CHARCOAL,0,NONE,10.6
87H05,67% Fine Merino Wool Cushion Sole Knee Length Ladies' Sock®,9,BLACK,0,NONE,11.9`
