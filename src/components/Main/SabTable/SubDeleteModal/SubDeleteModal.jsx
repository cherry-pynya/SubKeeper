import { render } from "@testing-library/react";

export default function SubDeleteModal() {
    render(
        <div className="modal-content">
            <h2>Вы уверенны, что хотите удалить подписку? Ее нельзя будет востановить!</h2>
        </div>
    );
}