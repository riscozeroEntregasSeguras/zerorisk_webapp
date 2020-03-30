#After git pull origin
cd
cd repo/eu-estou-bem-frontend
npm run build
cd
cd htdocs
rm -rf *
cd
cp -a repo/eu-estou-bem-frontend/dist/. htdocs/.
