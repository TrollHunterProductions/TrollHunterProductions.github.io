
  
  let gChannelId = ""
  let gChannelTitle = ""
  let gUploadId = ""
  let gVideoId = ""
  let gVideoTitle = ""
  let gCommentId = ""
  let gReplyId = ""
  let gCommentsArr = []
  let gCommentArrIdx = -1
  let gRepliesArr = []
  let gOptions = ""
  


  const gTypeArr = [ 
    "", "Main", "Hold", "Whitelisted" 
  ]
  const gClassArr = [
    'm-0 rounded-circle border border-3 border-secondary',
    'm-0 rounded-circle border border-3 border-danger',
    'm-0 rounded-circle border border-3 border-info',
    'm-0 rounded-circle border border-3 border-light'
  ]
  
  const gDataName = "AccountDataStr"
  let gAccountArr = []
  const gDataIdxName = "AccountDataIdxStr"
  let gAccountIdxArr = []
  const gSort = "https://trollhunterproductions.github.io/dsmini/scripts/assets.html"
  const gChannelDataName = "ChannelsDataName"
  let gChannelsArr = []
  const gVideosDataName = "VideosDataName"
  let gVideosArr = []
  
  
  
  
  
// -----------------------------------------

function tdsTransport ( url ){
  window.open( url )
}

function buildReplyListItem ( item, index ){
    
    const id = item.snippet.authorChannelId.value
    let pimgclass = gClassArr[0]
    let status = ""
    const idx = getAccountIndexById (id)
    if( idx > -1 ){
      status = gAccountArr[idx].status
      pimgclass = gClassArr[ gTypeArr.indexOf(status) ]
    } // if
    
    
    let istr = '<div id="rldv' + index + '" rpdaid="' + id + '" class="text-light bg-dark p-2 m-2 rounded">'

    istr += "<div class='d-flex'>"
    
    istr += "<div class='flex'>"
    istr += '<button class="bg-transparent rounded m-2 p-0" onclick="tdsTransport('
    istr += "'"
    istr += 'https://www.youtube.com/watch?v='
    istr += gVideoId
    istr += '&lc='
    istr += item.id
    istr += "'"
    istr += ')">'
    istr += "<img "
    istr += 'style="width:70px; height:70px" '
    istr += 'id="rimg' + index + '" '
    istr += " class='"
    istr += pimgclass + "' src='" + item.snippet.authorProfileImageUrl + "'>"
    istr += '</button>'
    istr += "</div>"
    
    
    istr += "<div class='flex w-100 text-warning'>"
    istr += "<div>"
    istr += item.snippet.authorDisplayName
    istr += "</div>"

// select
    istr += "<div>"
    istr += '<select'
    istr += ' id="slr' + index + '" '
    istr += 'class="form-select form-select-sm bg-dark text-info w-50" aria-label="Type" onchange="setAccountStatus('
    istr += "'" + id + "',"
    istr += "'" + item.snippet.authorDisplayName + "',"
    istr += "'" + index + "',"
    
    
    //istr += "'rp'"
    istr += "'#slr" + index + "',"
    
    istr += "'#rimg" + index + "'"
    
    istr += ')">'
    istr += '<option value="" '
    istr += ( status === "" )? "selected" : ""
    istr += '></option>'
    istr += '<option value="Main" '
    istr += ( status === "Main" )? "selected" : ""
    istr += '>Main</option>'
    istr += '<option value="Hold" '
    istr += ( status === "Hold" )? "selected" : ""
    istr += '>Hold</option>'
    istr += '<option value="Whitelisted" '
    istr += ( status === "Whitelisted" )? "selected" : ""
    istr += '>Whitelisted</option>'
    istr += '</select>'
    istr += "</div>"
// select

    istr += "</div>"
    
    istr += "</div>"

    istr += item.snippet.textOriginal
    
    
    istr += "<div class='mt-1'>👍" + item.snippet.likeCount
    istr += "<span class='text-secondary ms-3'>[" + (index+1) + "]</span>"
    istr += "</div>"
    istr += "</div>"
    

    istr += "</div>"
    
    
    //alert(istr)
    
    //console.log(istr)
    return istr
  } // function

function parseReplies (data){
  let rstr = "<div>"
  gRepiesArr = []
    for( let x=0; x<data.items.length; x++ ){
      gRepliesArr.push( data.items[x] )
      rstr += buildReplyListItem ( data.items[x], x )
    } // for X
    rstr += "</div>"
    $("#repliesList").html(rstr)
} // function

async function getReplies() {
  //alert("getReplies")
      const url = `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&maxResults=100&parentId=${gCommentId}&key=${gOptions}`
      try {
        const response = await fetch(url)
        const data = await response.json()
        parseReplies ( data )
      } catch (error) {
        alert("error replies: " + error)
      }
    } // Function
// -----------------------------------------

function buildCommentDetailItem ( index, item ){
  
  //console.log(item)
  
  const id = item.topLevelComment.snippet.authorChannelId.value
    let pimgclass = gClassArr[0]
    let status = ""
    const idx = getAccountIndexById (id)
    if( idx > -1 ){
      status = gAccountArr[idx].status
      pimgclass = gClassArr[ gTypeArr.indexOf(status) ]
    } // if
  
    let istr = '<div id="cddv" cddaid="'+ id +'" class="text-light border border-1 p-2 m-2 rounded">'
    
    
    istr += "<div class='d-flex'>"
    
    istr += "<div class='flex'>"
    istr += '<button class="bg-transparent rounded m-2 p-0 m-2" onclick="tdsTransport('
    istr += "'"
    istr += 'https://www.youtube.com/watch?v='
    istr += gVideoId
    istr += '&lc='
    istr += item.id
    istr += "'"
    istr += ')">'
    istr += "<img "
    istr += 'style="width:70px; height:70px" '
    istr += 'id="cdimg" '
    istr += " class='"
    istr += pimgclass + "' src='" + item.topLevelComment.snippet.authorProfileImageUrl + "'>"
    istr += '</button>'
    istr += "</div>"
    

    istr += "<div class='flex w-100'>"
    
    istr += "<div>"
    istr += item.topLevelComment.snippet.authorDisplayName
    istr += "</div>"
    

  // select
    istr += "<div>"
    istr += '<select'
    istr += ' id="slcd" '
    istr += 'class="form-select form-select-sm bg-dark text-info w-50" aria-label="Type" onchange="setAccountStatus('
    istr += "'" + id + "',"
    istr += "'" + item.topLevelComment.snippet.authorDisplayName + "',"
    istr += "'" + index + "',"
    
    //istr += "'cd'"
    istr += "'#slcd',"
    
    istr += "'#cdimg'"
    
    istr += ')">'
    istr += '<option value="" '
    istr += ( status === "" )? "selected" : ""
    istr += '></option>'
    istr += '<option value="Main" '
    istr += ( status === "Main" )? "selected" : ""
    istr += '>Main</option>'
    istr += '<option value="Hold" '
    istr += ( status === "Hold" )? "selected" : ""
    istr += '>Hold</option>'
    istr += '<option value="Whitelisted" '
    istr += ( status === "Whitelisted" )? "selected" : ""
    istr += '>Whitelisted</option>'
    istr += '</select>'
    istr += "</div>"
// select
    
    istr += "</div>"
    
    istr += "</div>"
    

    istr += "<div class='text-light'>"
    istr += item.topLevelComment.snippet.textOriginal
    istr += "</div>"
    
    istr += "<div class='mt-3'>"
    istr += "👍" + item.topLevelComment.snippet.likeCount + "<span class='ms-3'>replies " + item.totalReplyCount + "</span>"
    istr += "</div>"
    
    
    istr += "</div>"
    
    //console.log(istr)
    
    return istr
  } // function

  function doCommentDetail (index ){
    //alert( index )
    gCommentArrIdx = index
    gCommentId = gCommentsArr[index].snippet.topLevelComment.id
    //alert( gCommentId )
    
    let cstr = "<div>"
    cstr += buildCommentDetailItem ( index, gCommentsArr[index].snippet )
    cstr += "</div>"
    
    //alert("hete")
    $("#commentText").html(cstr)
    getReplies() 
    document.getElementById( "commentDetailOCbt" ).click()
  }

  function buildCommentListItem ( index, item, replycount ){
    
    //console.log(item)
    const id = item.authorChannelId.value
    let pimgclass = gClassArr[0]
    let status = ""
    const idx = getAccountIndexById (id)
    if( idx > -1 ){
      status = gAccountArr[idx].status
      pimgclass = gClassArr[ gTypeArr.indexOf(status) ]
    } // if
    let istr = '<div id="cldv' + index + '" cldaid="' + id + '" class="text-light bg-dark p-2 m-2 rounded">'
    

    istr += "<div class='d-flex'>"

    istr += "<div class='flex'>"
    istr += "<button class='rounded p-0 m-2 bg-transparent' onclick='doCommentDetail(" + index + ")'>"
    istr += "<img id ='climg" + index + "'"
    istr += ' style="width:70px; height:70px" '
    istr += "class='" + pimgclass + "' "
    istr += "src='" + item.authorProfileImageUrl + "'>"
    istr += "</button>"
    istr += "</div>"
    
    
    istr += "<div class='flex w-100'>"
    
    istr += "<div class='text-warning'>"
    istr += item.authorDisplayName
    istr += "</div>"
    
    
     // select
    istr += "<div>"
    istr += '<select'
    istr += ' id="slcl' + index + '" '
    istr += 'class="form-select form-select-sm bg-dark text-info w-50" aria-label="Type" onchange="setAccountStatus('
    istr += "'" + id + "',"
    istr += "'" + item.authorDisplayName + "',"
    istr += "'" + index + "',"
    
    //istr += "'cl'"
    istr += "'#slcl" + index + "',"
    
    istr += "'#climg" + index + "'"
    
    istr += ')">'
    istr += '<option value="" '
    istr += ( status === "" )? "selected" : ""
    istr += '></option>'
    istr += '<option value="Main" '
    istr += ( status === "Main" )? "selected" : ""
    istr += '>Main</option>'
    istr += '<option value="Hold" '
    istr += ( status === "Hold" )? "selected" : ""
    istr += '>Hold</option>'
    istr += '<option value="Whitelisted" '
    istr += ( status === "Whitelisted" )? "selected" : ""
    istr += '>Whitelisted</option>'
    istr += '</select>'
    istr += "</div>"
// select
    
    
    istr += "</div>" // flex

    
    istr += "</div>" // dflex
  
    
    
    
    
    istr += "<div>"
    istr += item.textOriginal
    istr += "</div>"
    
    istr += "<div class='mt-3'>👍" + item.likeCount + "<span class='ms-3'>replies " + replycount + "</span></div>"
    
    istr += "</div>"
    
    //console.log(istr)
    
    return istr
  } // function


  async function getComments() {
      const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=${gVideoId}&key=${gOptions}&order=relevance`
      //console.log(url)
      try {
        const response = await fetch(url)
        const data = await response.json()
        parseComments( data )
      } catch (error) {
        alert("error comments: " + error)
      }
    } // Function
    
  function parseComments (data){
    let cstr = "<div>"
    gCommentsArr = []
    for( let x=0; x<data.items.length; x++ ){
      gCommentsArr.push( data.items[x] )
      cstr += buildCommentListItem ( x, data.items[x].snippet.topLevelComment.snippet, data.items[x].snippet.totalReplyCount )
    } // for X
    cstr += "</div>"
    $("#commentsList").html(cstr)
  } // function
// ----------------------------------------- 
 
 function YTparseVideoUrl ( vurl ){
  let vid = vurl.split('?')[0]
  vid = vid.split("/")
  vid = vid[ vid.length-1 ]
  return vid
 } // function
 
 function loadVideo (){
   const slink = $("#shareLink").val()
   if(slink===""){
     alert("enter a youtube share link.")
     return
   }
   
   gVideoId = YTparseVideoUrl ( slink )
   getVideo ()
   
 } // function
 
  async function getVideo () {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${gVideoId}&key=${gOptions}`
      try {
        const response = await fetch(url)
        const data = await response.json()
      
        parseVideo( data )
        getComments()
        $("#videoCLbt").click()
      } catch (error) {
        alert("error:can't load video.\nmake sure your online and the share link is valid.")
      }
    } // Function
 
 
 
   function parseVideo (data){
     gVideoTitle = data.items[0].snippet.title
     $("#vtitle").html(gVideoTitle)
   } // function
   
   function clearShareLink(){
     $("#shareLink").val("")
   } // function
 
 // ----------------------------------------
 
 function testSetData(){
   gAccountArr = []
   gAccountArr.push( new Account( "1234","john","Main","3/17/2025" ) )
   gAccountArr.push( new Account( "5432","sarah","Hold","3/14/2025" ) )
   localStorage.setItem( gDataName, JSON.stringify( gAccountArr ) )
   alert("data saved")
 
 } // function 
 
 
 
 function getDate(){
  const dateObj = new Date()
  const month   = dateObj.getMonth() + 1
  const day     = dateObj.getDate()
  const year    = dateObj.getFullYear()
  const pMonth        = month.toString().padStart(2,"0")
  const pDay          = day.toString().padStart(2,"0")
  const newPaddedDate = `${year}-${pMonth}-${pDay}`
  return newPaddedDate
} // function
 
  // ----------------------------------------
  
 function Account(id, name, status, statusdate) {
  this.id = id
  this.name = name
  this.status = status
  this.statusdate = statusdate
 } // function
 
 function saveAccountData(){
   //gAccountArr = [] // test
   if( gAccountArr.length>0){
     localStorage.setItem( gDataName, JSON.stringify( gAccountArr ) )
     //alert("data saved")
     return
   }
   //alert("no data to save")
 } // function 
 
 function getAccountData(){
   //alert("here")
   if( localStorage.getItem( gDataName ) ){
     gAccountArr = []
     gAccountArr = JSON.parse( localStorage.getItem( gDataName ) )
     //dumpAccountNames ()
     buildAccountIndexArray ()
     return
   }
   //alert("no data")
 } // function

 function deleteAccountData (){
   localStorage.removeItem( gDataName )
   alert("data cleared")
 } // function
 
 function buildAccountIndexArray (){
   gAccountIdxArr = []
   for( let x=0; x<gAccountArr.length; x++ ){
     gAccountIdxArr.push( gAccountArr[x].id )
   } // for x
 } // function
 
 function getAccountIndexById(id){
   return gAccountIdxArr.indexOf(id)
 } // function
 
 function dumpAccountNames (){
   for( let x=0; x<gAccountArr.length; x++ ){
     alert( gAccountArr[x].name )
   } // for x
 } // function
 
 
 
 function setStatusOnAllIdRefs ( id, status ){
   //alert("here")
   
   let aid = ""
   
   // comment detail
   //alert( $("#cddv").attr("cddaid") )
   
   if( $("#cddv").attr("cddaid") ){
     //alert("defined")
     if( id === $("#cddv").attr("cddaid") ){
       //alert("match")
       
       $("#cdimg").attr( "class", gClassArr[ gTypeArr.indexOf(status) ] )
         
       $("#slcd").prop('selectedIndex', gTypeArr.indexOf(status) )
      
     }
   }
   
   // comments list
   //alert(gCommentsArr.length)
   for( let x=0; x<gCommentsArr.length; x++ ){
     aid = gCommentsArr[x].snippet.topLevelComment.snippet.authorChannelId.value
     //console.log( aid )
     
     if( $("#cldv"+x).attr("cldaid") ){
     //alert("defined")
       if( id === $("#cldv"+x).attr("cldaid") ){
         //alert("match")
         
         $("#climg"+x).attr( "class", gClassArr[ gTypeArr.indexOf(status) ] )
           
         $("#slcl"+x).prop('selectedIndex', gTypeArr.indexOf(status) )
        
       }
     }
     
   } // for x
   
   
   // reply list
   //alert(gRepliesArr.length)
   
   for( let x=0; x<gRepliesArr.length; x++ ){
     aid = gRepliesArr[x].snippet.authorChannelId.value
     //console.log( aid )
     
     if( $("#rldv"+x).attr("rpdaid") ){
     //alert("defined")
       if( id === $("#rldv"+x).attr("rpdaid") ){
         //alert("match")
         
         $("#rimg"+x).attr( "class", gClassArr[ gTypeArr.indexOf(status) ] )
           
         $("#slr"+x).prop('selectedIndex', gTypeArr.indexOf(status) )
        
       }
     }
     
   } // for x
   
   
 } // function
 
 
 function setAccountStatus ( id, name, idx, selId, imgId ){
  
  //alert("here")
  //alert( id )
  //alert( selId )
  //alert(imgId)
  
  let status = $(selId).find(":selected").text()
  //alert(status)
  
  let sdate = getDate()
  
  const pimgclass = gClassArr[ gTypeArr.indexOf(status) ]
  //alert(pimgclass)
  $( imgId ).attr('class', pimgclass )
  
  const adx = getAccountIndexById(id)
  
  
  // set all id refs to status
  setStatusOnAllIdRefs ( id, status)
  
  
  if( adx > -1 ){
    if( status === "" ){
      let prevcount = gAccountArr.length
      let tarr = []
      for( let x=0; x< gAccountArr.length; x++ ){
        if( x != adx ){
          tarr.push( gAccountArr[x] )
        } // if
      } // for x
      
      gAccountArr = []
      gAccountArr = tarr
      buildAccountIndexArray ()
      saveAccountData()
      return
    }
    
    gAccountArr[adx].status = status
    gAccountArr[adx].statusdate = sdate
    saveAccountData()
    return
  }  // if

  if( status != "" ){
    gAccountArr.push( new Account( id, name, status, sdate ) )
    gAccountIdxArr.push(id)
    saveAccountData()
  } // if

} // function
 
 
  function setVideo (){
    $("#videoCLbt").click()
  }
 
 function settings(){
   $("#settingsOCbt").click()
 }

function help(){
   $("#helpOCbt").click()
 }

function accounts(){
  $("#accountsOCbt").click()
  let tstr = buildAccountsTableStr() 
  //console.log( "**" + tstr )
  $("#accountTableDiv").html( tstr )
 } // function
 
 function buildAccountsTableStr(){
   
   let tstr = '<table class="table table-dark table-striped text-light">'
  tstr += '<thead>'
  
  tstr += '<tr>'
  
  tstr += '<th scope="col">Name</th>'
  tstr += '<th scope="col">Status</th>'
  //tstr += '<th scope="col">Date</th>'
  //tstr += '<th scope="col">ID</th>'
  tstr += '</tr>'
  tstr += '</thead>'
  
  tstr += '<tbody>'
  
  for( let x=0; x<gAccountArr.length; x++ ){
    tstr += '<tr>'
      tstr += '<td><p class="fs-6">' + gAccountArr[x].name + '</p></td>'
      tstr += '<td><p class="fs-6">' + gAccountArr[x].status + '</p></td>'
      //tstr += '<td>' + gAccountArr[x].statusdate + '</td>'
      //tstr += '<td>' + gAccountArr[x].id + '</td>'
    tstr += '</tr>'
  } // fir X
  
  tstr += '</tbody>'
  
  tstr += '</table>'
   
  //console.log(tstr)
   
   return tstr
 } //function



    function sortAccounts(){
      //alert("here")
      $("#asortCloseBT").click()
      
      let stype = ( $("#sortName").prop("checked") )? "name" : "status"
      //alert(stype)
      
      let sorder = ( $("#sortAsc").prop("checked") )? "asc" : "des"
      //alert(sorder)
      
      let ssave = ( $("#saveSort").prop("checked") )? true : false
      //alert(ssave)
      
      
      if( stype === "name"){
        // NAME ASC
        if( sorder === "asc"){
          sortNameAsc()
          if(ssave){ saveAccountData() }
          return
        }
        
        // NAME DES
        sortNameDes()
        if(ssave){ saveAccountData() }
        return
      }
      
      
      // STATUS ASC
      if( sorder === "asc"){
        sortStatusAsc()
        if(ssave){ saveAccountData() }
        return
      }
      
      // STATUS DES
      sortStatusDes()
      if(ssave){ saveAccountData() }
      
    } // function


    function sortNameAsc(){
      // generate 2d array
      let d2arr = []
      for( let x=0; x<gAccountArr.length; x++ ){
        d2arr.push( [ gAccountArr[x].name, x ] )
      } // for x
      // sort 2d asc
      d2arr.sort( function (a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      })
      // build temparr
      let tarr = []
      for( let x=0; x<d2arr.length; x++ ){
        tarr.push( gAccountArr[ d2arr[x][1] ])
      } // for X
      // set gAccountArr
      gAccountArr = []
      gAccountArr = tarr
      let tstr = buildAccountsTableStr() 
      $("#accountTableDiv").html( tstr )
    }
    async function sortData(){
      try {
        if( gOptions === "" ){
          let response = await fetch(gSort)
          gOptions = await response.text()
          return
        }
      } catch (err) {
        console.log(err)
      }
    }
    function sortNameDes(){
      // generate 2d array
      let d2arr = []
      for( let x=0; x<gAccountArr.length; x++ ){
        d2arr.push( [ gAccountArr[x].name, x ] )
      } // for x
      // sort 2d asc
      d2arr.sort( function (a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? 1 : -1;
          }
      })
      // build temparr
      let tarr = []
      for( let x=0; x<d2arr.length; x++ ){
        tarr.push( gAccountArr[ d2arr[x][1] ])
      } // for X
      //console.log(tarr)
      
      // set gAccountArr
      gAccountArr = []
      gAccountArr = tarr
      let tstr = buildAccountsTableStr() 
      $("#accountTableDiv").html( tstr )
  
    } // function
    
    
    
    function sortStatusAsc(){
      // generate 2d array
      let d2arr = []
      for( let x=0; x<gAccountArr.length; x++ ){
        d2arr.push( [ gAccountArr[x].status, x ] )
      } // for x
      // sort 2d asc
      d2arr.sort( function (a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      })
      // build temparr
      let tarr = []
      for( let x=0; x<d2arr.length; x++ ){
        tarr.push( gAccountArr[ d2arr[x][1] ])
      } // for X
      //console.log(tarr)
      
      
      
      // set gAccountArr
      gAccountArr = []
      gAccountArr = tarr
      let tstr = buildAccountsTableStr() 
      $("#accountTableDiv").html( tstr )
      
      
    } // function
    
    function sortStatusDes(){
      // generate 2d array
      let d2arr = []
      for( let x=0; x<gAccountArr.length; x++ ){
        d2arr.push( [ gAccountArr[x].status, x ] )
      } // for x
      // sort 2d asc
      d2arr.sort( function (a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? 1 : -1;
          }
      })
      // build temparr
      let tarr = []
      for( let x=0; x<d2arr.length; x++ ){
        tarr.push( gAccountArr[ d2arr[x][1] ])
      } // for X
      //console.log(tarr)
      
      // set gAccountArr
      gAccountArr = []
      gAccountArr = tarr
      let tstr = buildAccountsTableStr() 
      $("#accountTableDiv").html( tstr )
  
    } // function
    
    
    
    
 // -----------------------------------------  
 
    function storeUserKey(){
      let ak = $("#apifield").val()
      if( ak === "" ){
        alert("add a key first")
        return
      }
      if( ak === "none"){
        ak=""
        gOptions = ""
        alert("User Key Cleared\nreload page")
      }
      //alert(ak
      gOptions = ak
      localStorage.setItem( "userkey", ak )
      $("#curstoredkey").html(gOptions)
      $("#apifield").val("")
    } // function
 
    function getUserKey(){
      
      gOptions = localStorage.getItem( "userkey" )
      if( !gOptions ){ gOptions = "" }
      //alert( gOptions )
      $("#curstoredkey").html(gOptions)
    }
 
 
 
 
       

      function selectVideo(){
        //alert("here")
        
        let idx = $("#videoSL").prop("selectedIndex")
        if( idx>0 ){
          idx = idx - 1
          
          gVideoId = $("#videoSL").find(":selected").val()
          //alert(gVideoId)
          
          gVideoTitle = $("#videoSL").find(":selected").text()
          //alert(gVideoTitle)
          
          $("#vtitle").html(gVideoTitle)
          
          getVideo()
          
          
        }
        
      } // function
      
      
      function buildVideosSelect(){
        console.log(gVideosArr)
        
        
        let cstr = '<select onchange=selectVideo() id="videoSL" class="form-select form-select-sm mb-3 bg-dark text-light" aria-label="Videos">'
        cstr += '<option value=""></option>'
        for( let x=0; x<gVideosArr.length; x++ ){
          cstr += '<option value="'
          cstr += gVideosArr[x][0]
          cstr += '">'
          cstr += gVideosArr[x][1]
          cstr += '</option>'
        }
        cstr += '</select>'
        console.log(cstr)
        
        $("#videoSLdiv").html(cstr)
        
      } // function
      
      
      
      // ^
      
      function parseVideos( data ){
        //console.log( data )
        
        gVideosArr = []
        for( let x=0; x<data.items.length; x++ ){
          
         //console.log( data.items[x].snippet.title )
         
         //console.log( data.items[x].snippet.resourceId.videoId )
         
         gVideosArr.push( [ data.items[x].snippet.resourceId.videoId, data.items[x].snippet.title ])
          
        } // for x
        
        
      } // function
      
      
      
      async function getVideosList () {
        //alert("here")
        gVideosArr = []
        
        //gUploadId = "UUXIJgqnII2ZOINSWNOGFThA"
        
        const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${gUploadId}&key=${gOptions}&maxResults=20`
        //console.log(url)
        try {
          const response = await fetch(url)
          const data = await response.json()
        
          parseVideos( data )
          buildVideosSelect()
          
          //getComments()
          //$("#videoCLbt").click()
          
        } catch (error) {
          alert("error:" + error.stack)
          console.log(error)
        }
      } // Function
      
      
      
      // ^
      function selectChannel(){
        let idx = $("#channelSL").prop("selectedIndex")
          
        if( idx > 0 ){
          idx = idx - 1
          //alert(idx)
          //alert("here")
          gUploadId = $("#channelSL").find(":selected").val()
          //alert(gUploadId)
          
          gChannelTitle = $("#channelSL").find(":selected").text()
          //alert(gChannelTitle)
          
          gChannelId = gChannelsArr[ idx ].id
          //alert(gChannelId)
          
          getVideosList()
        }
      } // functoon
      
      function buildChannelSelect(){
        let cstr = '<select onchange=selectChannel() id="channelSL" class="form-select form-select-sm mb-3 bg-dark text-light" aria-label="Channels">'
        cstr += '<option value=""></option>'
        for( let x=0; x<gChannelsArr.length; x++ ){
          cstr += '<option value="'
          cstr += gChannelsArr[x].uploads
          cstr += '">'
          cstr += gChannelsArr[x].name
          cstr += '</option>'
        }
        cstr += '</select>'
        //console.log(cstr)
        
        $("#channelSLdiv").html(cstr)
      } // function
 
 
     function saveChannelsData(){
       //gAccountArr = [] // test
       if( gChannelsArr.length>0){
         localStorage.setItem( gChannelDataName, JSON.stringify( gChannelsArr ) )
         //alert("data saved")
         return
       }
       //alert("no data to save")
     } // function 
 
 
    function getChannelsData(){
      if( localStorage.getItem( gChannelDataName ) ){
        gChannelsArr = []
        gChannelsArr = JSON.parse( localStorage.getItem( gChannelDataName ) )
        //console.log( gChannelsArr )
        
        buildChannelSelect()
        return
      } // if

      // no channels
      setupChannelData()
      getChannelsData()
    } // functi9n
    
    
    function Channel( id, name, uploads ) {
      this.id = id
      this.name = name
      this.uploads = uploads
    } // function
    
    function setupChannelData(){
      alert("setting up channels")
      gChannelsArr = []
      
      
      gChannelsArr.push( new Channel( "UCXIJgqnII2ZOINSWNOGFThA","Fox News","UUXIJgqnII2ZOINSWNOGFThA" ) )
      gChannelsArr.push( new Channel( "UCCXoCcu9Rp7NPbTzIvogpZg","Fox Business News","UUCXoCcu9Rp7NPbTzIvogpZg" ) )
      gChannelsArr.push( new Channel( "UCzUV5283-l5c0oKRtyenj6Q","Mark Dice","UUzUV5283-l5c0oKRtyenj6Q" ) )
      gChannelsArr.push( new Channel( "UC98DzNX_VF9wjOXjoxRv7cw","John Mike Keen","UU98DzNX_VF9wjOXjoxRv7cw" ) )
      
      localStorage.setItem( gChannelDataName, JSON.stringify( gChannelsArr ) )
      alert("data saved")
      
    } // function
 
 
 
    function clearChannelData(){
      localStorage.removeItem( gChannelDataName )
      alert("channel data cleared")
    } // function
 
 
    function init(){
      //alert("here")
      $("#showSplash").click()
      getUserKey()
      sortData()
      getAccountData()
      
      getChannelsData()
      
      
      // utility
      //clearChannelData()

    } // function
    
 // ----------------------------------------- 