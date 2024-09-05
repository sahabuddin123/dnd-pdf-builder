$(function () {
    $(".grid-cell-content").droppable({
        accept: ".draggable-element",
        drop: function (event, ui) {
            var newElement = $(ui.helper).clone().removeClass('draggable-element').addClass('dropped-element');
            $(this).append(newElement);
            handleElementDrop(newElement);
        }
    });

    $(".draggable-element").draggable({
        helper: "clone",
        revert: "invalid"
    });
});
function handleElementDrop(element) {
    // নতুন ড্রপ করা উপাদানের টাইপ অনুযায়ী এডিট করার জন্য ইভেন্ট হ্যান্ডলার যোগ করা
    element.find('.edit-button').on('click', function () {
        var elementType = $(this).closest('.dropped-element').data('type');
        openModalForEditing(elementType, $(this).closest('.dropped-element'));
    });

    // ডিলিট করার জন্য ইভেন্ট হ্যান্ডলার
    element.find('.delete-button').on('click', function () {
        $(this).closest('.dropped-element').remove();
    });
}

function openModalForEditing(type, element) {
    // প্রয়োজন অনুযায়ী মডাল খোলা
    switch (type) {
        case 'text-heading':
            $("#textModal").dialog("open");
            break;
        case 'table':
            $("#tableModal").dialog("open");
            break;
        // অন্যান্য উপাদানের জন্য কেস যোগ করুন
    }
}
$("#textModal").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        "Save": function () {
            // আপনার ডাটা সেভ করার লজিক
            $(this).dialog("close");
        },
        "Cancel": function () {
            $(this).dialog("close");
        }
    }
});
$(function () {
    // ড্র্যাগেবল রো
    $(".grid-row").draggable({
        helper: "clone",
        revert: "invalid",
        start: function (event, ui) {
            $(this).addClass("is-dragging");
        },
        stop: function (event, ui) {
            $(this).removeClass("is-dragging");
        }
    });

    // ড্রপেবল এরিয়া
    $("#grid-container").droppable({
        accept: ".grid-row",
        drop: function (event, ui) {
            const draggedRow = ui.helper;
            const newRow = draggedRow.clone();
            $(this).append(newRow);

            // ড্র্যাগ এবং ড্রপ ফাংশনালিটি আবার প্রয়োগ করা
            applyDragDrop();
        }
    });

    function applyDragDrop() {
        $(".grid-row").draggable({
            helper: "clone",
            revert: "invalid"
        });

        $(".grid-row .icon-delete-row").on("click", function () {
            $(this).closest(".grid-row").remove();
        });
    }

    // গ্রিড রো তৈরির জন্য ইভেন্ট হ্যান্ডলার
    $("#add-row-button").on("click", function () {
        const newRow = $('<div class="grid-row">New Row Content</div>');
        $("#grid-container").append(newRow);
        applyDragDrop();
    });
});
// রো রিমুভ করার জন্য ক্লিক ইভেন্ট হ্যান্ডলার
$(".grid-row .icon-delete-row").on("click", function () {
    $(this).closest(".grid-row").remove();
});
$(document).ready(function () {
    const gridTypes = {
        "1-grid": "1fr",
        "2-grid": "1fr 1fr",
        "3-grid": "1fr 1fr 1fr",
        "4-grid": "1fr 1fr 1fr 1fr",
        "2/10-grid": "2fr 10fr",
        "10/2-grid": "10fr 2fr",
        // আরও Grid Types সংযোজন করুন
    };

    function getGridTemplate(gridType) {
        return gridTypes[gridType] || "1fr";
    }

    function createGridRow(gridType) {
        const rowId = `row-${Date.now()}`;
        const cellCount = gridType.includes("/") ? 2 : parseInt(gridType);
        const row = $('<div>', { class: 'grid-row', id: rowId });

        const gridTemplate = getGridTemplate(gridType);
        row.css('grid-template-columns', gridTemplate);

        for (let i = 0; i < cellCount; i++) {
            const cell = $('<div>', { class: 'grid-cell', text: `Cell ${i + 1}` });
            const deleteButton = $('<button>', { class: 'delete-cell', text: 'Delete' });

            deleteButton.on('click', function () {
                cell.remove();
                if (row.find('.grid-cell').length === 0) {
                    row.remove();
                }
            });

            cell.append(deleteButton);
            row.append(cell);
        }

        $('#grid-container').append(row);
    }

    $('#add-row').on('click', function () {
        const gridType = '2-grid'; // আপনার প্রয়োজন মতো gridType সেট করুন
        createGridRow(gridType);
    });
});
$(function () {
    // রো সোর্টেবল ফাংশনালিটি
    $("#grid-container").sortable({
        handle: ".grid-row",
        stop: function (event, ui) {
            console.log("Rows have been sorted!");
        }
    });
});