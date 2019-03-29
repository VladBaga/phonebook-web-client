window.Phonebook = {

    apiUrl: "http://localhost:8083/phone-books",

    addItem: function () {
        var name = $("input[title='Name']").val();
        var surname = $("input[title='Surname']").val();
        var phoneNumber = $("input[title='PhoneNumber']").val();
        var age = $("input[title='Age']").val();
        var data = {
            'name': name,
            'surname': surname,
            'phoneNumber': phoneNumber,
            'age': age
        };

        $.ajax(
            {
                url: Phonebook.apiUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
            //reload items table
            Phonebook.getItems(response);
        });
    },

    getItemRow: function (item) {
        return `<tr>
 <td class="name">${item.name}</td>
 <td class="surname">${item.surname}</td>
 <td class="phoneNumber">${item.phoneNumber}</td>
  <td class="age">${item.age}</td>
   <td><a href="#" class="fa fa-trash delete" data-id="${item.id}"></a></td>
</tr>`
    },

    displayItems: function(items){
        console.log('Displaying phone-book.');
        var rows = '';

        items.forEach(item => rows += Phonebook.getItemRow(item));

        console.log(rows);

        $('#phone-books tbody').html(rows);
    },

    getItems: function () {
        $.ajax(
            {
                url: Phonebook.apiUrl,
                method: "GET"
            }).done(function (response) {
            console.log(response);
            //reload items table

            Phonebook.displayItems(response)
        });
    },

    deleteItem: function(id){
        $.ajax(
            {
                url: Phonebook.apiUrl + '?id=' + id,
                method: "DELETE"
            }).done(function (response) {
            console.log(response);
            //reload items table

            Phonebook.getItems(response);
        });
    },

    bindEvents: function () {

        $("#create-phone-book-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting phone-book form');

            Phonebook.addItem();

            return false;
        });

        $('#phone-books tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');

            Phonebook.deleteItem(id);
        })
    }

};
Phonebook.getItems();
Phonebook.bindEvents();