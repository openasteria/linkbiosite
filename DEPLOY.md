# Деплой на GitHub Pages (opendam.online)

Репозиторий: **openasteria/linkbiosite** · домен: **opendam.online** (файл `CNAME`)

## Важно про домен
GitHub Pages отдаёт кастомный домен только с той ветки, которая
настроена как источник Pages (сейчас это `main`). Поэтому для публикации
под доменом изменения из `beta` нужно смержить в `main`.

## Вариант 1 — через GitHub CLI (gh)
```bash
git push origin beta                 # залить бета-ветку
gh pr create -B main -H beta --title "beta -> main" --fill
gh pr merge --squash --admin --delete-branch   # смержить даже без ревью
```

## Вариант 2 — через git + токен (PAT)
1. Создать токен: https://github.com/settings/tokens → scope `repo`, `workflow`
2. Выполнить (замените YOUR_TOKEN):
```bash
cd /workspace
git remote add origin https://github.com/openasteria/linkbiosite.git
git push origin beta
git checkout main && git merge beta --no-edit
git push https://<YOUR_TOKEN>@github.com/openasteria/linkbiosite.git main
```

## Вариант 3 — вручную через веб-интерфейс
1. Открыть https://github.com/openasteria/linkbiosite
2. Create branch from `main` → `beta` (или загрузить файлы через Upload files)
3. Compare & pull request `beta` → `main` → Merge (кнопка «Merge» работает у владельца и без ревью)
4. Через 1–2 минуты обновится https://opendam.online

## Проверка после деплоя
```bash
curl -sI https://opendam.online | grep last-modified   # дата должна измениться
```
