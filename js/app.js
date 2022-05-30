function getChairs() {
    $.ajax({
        url: 'http://localhost:3000/Chairs',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            let count = 1;
            $('#item-table').empty()
            $.each(data, function (i, v) {
                    $('#item-table').append(
                        `<tr>
                            <td>${count}</td>
                            <td>${v.id}</td>
                            <td>${v.name}</td>
                            <td>${v.roomName}</td>
                            <td>${v.rowName}</td>
                            <td>${convertCurreny(v.price,1)}</td>
                            <td><span class="${(v.status=="Hỏng")?'broken':'normal'}-status">${v.status}</span></td>
                            <td><a href="#" id="myBtn"><i class="fa-solid fa-pencil text-color mr-10px" onclick="setDataModalUpdate('${v.id}')" ></i></a>
                                <a href="#" onclick="deleteChairs('${v.id}')" ><i class="fa-solid fa-trash-can text-color"></i></a></td>
                        </tr>`
                    )
                count++
                
            })
            handleModal()
            handleModalCreate()
        }
    })
}
getChairs()

$('#createBtn').bind('click', createChair);
function createChair() {
    let chair = {
        id: uuidv4(),
        name: $('#modal-create-name').val(),
        roomName: $('#modal-create-roomName').val(),
        rowName: $('#modal-create-rowName').val(),
        price: $('#modal-create-price').val(),
        status: $('#modal-create-status').val()
    }
    swal({
        title: "Tạo mới thành công",
        icon: "success",
      })
      .then((willCreated) => {
        if (willCreated) {
            $.ajax({
                url: 'http://localhost:3000/Chairs',
                method: "POST",
                dataType: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(chair),
                success: (data) => {
                }
            })
        }
      });

}

function setDataModalUpdate(id){
    $.ajax({
        url: 'http://localhost:3000/Chairs/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $("#modal-update-id").val(data.id)
            $("#modal-update-name").val(data.name)
            $("#modal-update-roomName").val(data.roomName)
            $("#modal-update-rowName").val(data.rowName)
            $("#modal-update-price").val(data.price)
            $("#modal-update-status").val(data.status)
        }
    })
}

function updateChairs() {
    let chair = {
        id: $('#modal-update-id').val(),
        name: $('#modal-update-name').val(),
        roomName: $('#modal-update-roomName').val(),
        rowName: $('#modal-update-rowName').val(),
        price: $('#modal-update-price').val(),
        status: $('#modal-update-status').val()
    }
    swal({
        title: "Cập nhật thành công",
        icon: "success",
      })
      .then((willUpdated) => {
        if (willUpdated) {
            $.ajax({
                url: 'http://localhost:3000/Chairs/' + chair.id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(chair),
                success: function (data) {
                }
            })
        }
      });
}

function deleteChairs(id) {
    swal({
        title: "Xoá ghế này ?",
        buttons: ["Huỷ", "Xoá"],
        icon: "warning",
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url : 'http://localhost:3000/Chairs/'+id,
                    method : "DELETE",
                    dataType : "JSON",
                    success : function (data){
                        
                    }
                })
            }
        });
}
function searchChair(){
    let inpSearch = $('#search-chair').val()
    if(inpSearch!= ''){
        $.ajax({
            url: 'http://localhost:3000/Chairs',
            method: "GET",
            dataType: "JSON",
            success: function (data) {
                $('#item-table').empty()
                let count = 1;
                $.each(data, function (i, v) {
                    if(v.name == inpSearch){
                        $('#item-table').append(
                            `<tr>
                                <td>${count}</td>
                                <td>${v.id}</td>
                                <td>${v.name}</td>
                                <td>${v.roomName}</td>
                                <td>${v.rowName}</td>
                                <td>${convertCurreny(v.price,1)}</td>
                                <td><span class="${(v.status=="Hỏng")?'broken':'normal'}-status">${v.status}</span></td>
                                <td><a href="#" id="myBtn"><i class="fa-solid fa-pencil text-color mr-10px" onclick="setDataModalUpdate('${v.id}')" ></i></a>
                                    <a href="#" onclick="deleteChairs('${v.id}')" ><i class="fa-solid fa-trash-can text-color"></i></a></td>
                            </tr>`
                        )
                        count++
                    }
                })
                handleModal()
                handleModalCreate()
            }
        })
    }
    else getChairs()
}